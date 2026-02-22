
import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'
import { db } from '../firebase'
import { ref, set, onValue, off } from 'firebase/database'

const ShiftContext = createContext()
const STORAGE_KEY = 'tk_shift_state'
const ATTENDANCE_KEY = 'tk_attendance_records'
const FIREBASE_SHIFT_PATH = 'shiftState'
const FIREBASE_ATTENDANCE_PATH = 'attendanceRecords'

/* Helper: format Date → hh:mm:ss AM/PM */
function formatTime(date) {
  if (!date) return '—'
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
}

/* Serialize dates for localStorage */
function serializeRecords(records) {
  return records.map(r => ({
    ...r,
    date: r.date?.toISOString() || null,
    checkIn: r.checkIn?.toISOString() || null,
    checkOut: r.checkOut?.toISOString() || null,
  }))
}

function deserializeRecords(records) {
  return records.map(r => ({
    ...r,
    date: r.date ? new Date(r.date) : null,
    checkIn: r.checkIn ? new Date(r.checkIn) : null,
    checkOut: r.checkOut ? new Date(r.checkOut) : null,
  }))
}

/* Load saved shift from localStorage */
function loadShiftState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return {
      ...data,
      checkInTime: data.checkInTime ? new Date(data.checkInTime) : null,
      checkOutTime: data.checkOutTime ? new Date(data.checkOutTime) : null,
      breakStartTime: data.breakStartTime ? new Date(data.breakStartTime) : null,
      activityLog: (data.activityLog || []).map(l => ({
        ...l,
        timestamp: l.timestamp ? new Date(l.timestamp) : null,
      })),
    }
  } catch { return null }
}

function loadAttendance() {
  try {
    const raw = localStorage.getItem(ATTENDANCE_KEY)
    if (!raw) return null
    return deserializeRecords(JSON.parse(raw))
  } catch { return null }
}

const defaultAttendance = [
  { id: 1, date: new Date(2026, 1, 10, 9, 19), company: '1133 S Hope St', area: '—', checkIn: new Date(2026, 1, 10, 9, 19), checkOut: null, breakSeconds: 300, dutySeconds: 747660, active: true },
  { id: 2, date: new Date(2026, 1, 2, 16, 17), company: '1133 S Hope St', area: '—', checkIn: new Date(2026, 1, 2, 16, 17), checkOut: new Date(2026, 1, 10, 9, 19), breakSeconds: 0, dutySeconds: 666060, active: false },
]

export function ShiftProvider({ children }) {
  // ── Load persisted state ──
  const saved = loadShiftState()

  const [attendanceRecords, setAttendanceRecords] = useState(() => loadAttendance() || defaultAttendance)

  const [selectedPost, setSelectedPost] = useState(saved?.selectedPost || '')
  const [isCheckedIn, setIsCheckedIn] = useState(saved?.isCheckedIn || false)
  const [checkInTime, setCheckInTime] = useState(saved?.checkInTime || null)
  const [checkOutTime, setCheckOutTime] = useState(saved?.checkOutTime || null)
  const [isOnBreak, setIsOnBreak] = useState(saved?.isOnBreak || false)
  const [breakStartTime, setBreakStartTime] = useState(saved?.breakStartTime || null)
  const [breakCount, setBreakCount] = useState(saved?.breakCount || 0)
  const [activityLog, setActivityLog] = useState(saved?.activityLog || [])
  const activeRecordId = useRef(saved?.activeRecordId || null)

  // For duty/break seconds, compute elapsed time from check-in timestamp
  const computeElapsed = useCallback(() => {
    if (!saved?.isCheckedIn || !saved?.checkInTime) return { duty: 0, brk: 0 }
    const now = Date.now()
    const savedDuty = saved.savedDutySeconds || 0
    const savedBreak = saved.savedBreakSeconds || 0
    const pausedAt = saved.lastPausedAt ? new Date(saved.lastPausedAt).getTime() : now

    if (saved.isOnBreak) {
      // Duty was paused when break started, break is running
      const breakElapsed = Math.floor((now - (saved.breakStartTime ? new Date(saved.breakStartTime).getTime() : now)) / 1000)
      return { duty: savedDuty, brk: savedBreak + breakElapsed }
    } else {
      // Duty is running since lastPausedAt
      const dutyElapsed = Math.floor((now - pausedAt) / 1000)
      return { duty: savedDuty + dutyElapsed, brk: savedBreak }
    }
  }, [])

  const initial = saved?.isCheckedIn ? computeElapsed() : { duty: 0, brk: 0 }
  const [dutySeconds, setDutySeconds] = useState(initial.duty)
  const [totalBreakSeconds, setTotalBreakSeconds] = useState(initial.brk)

  const dutyTimerRef = useRef(null)
  const breakTimerRef = useRef(null)

  // ── Persist shift state to localStorage & Firebase ──
  const persistShift = useCallback((overrides = {}) => {
    const state = {
      selectedPost, isCheckedIn, checkInTime: checkInTime?.toISOString() || null,
      checkOutTime: checkOutTime?.toISOString() || null,
      isOnBreak, breakStartTime: breakStartTime?.toISOString() || null,
      breakCount, activeRecordId: activeRecordId.current,
      activityLog: activityLog.map(l => ({ ...l, timestamp: l.timestamp?.toISOString() || null })),
      ...overrides,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    // Write to Firebase
    set(ref(db, FIREBASE_SHIFT_PATH), state)
  }, [selectedPost, isCheckedIn, checkInTime, checkOutTime, isOnBreak, breakStartTime, breakCount, activityLog])

  // Persist attendance records to localStorage & Firebase
  useEffect(() => {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(serializeRecords(attendanceRecords)))
    set(ref(db, FIREBASE_ATTENDANCE_PATH), serializeRecords(attendanceRecords))
  }, [attendanceRecords])

  const addAttendanceRecord = useCallback((record) => {
    setAttendanceRecords(prev => [record, ...prev])
  }, [])

  const updateAttendanceRecord = useCallback((id, updates) => {
    setAttendanceRecords(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r))
  }, [])

  const addLog = useCallback((action, time) => {
    setActivityLog((prev) => [{ action, time: formatTime(time), timestamp: time }, ...prev])
  }, [])

  const startDutyTimer = useCallback(() => {
    if (dutyTimerRef.current) return
    dutyTimerRef.current = setInterval(() => setDutySeconds(p => p + 1), 1000)
  }, [])

  const stopDutyTimer = useCallback(() => {
    if (dutyTimerRef.current) { clearInterval(dutyTimerRef.current); dutyTimerRef.current = null }
  }, [])

  const startBreakTimer = useCallback(() => {
    if (breakTimerRef.current) return
    breakTimerRef.current = setInterval(() => setTotalBreakSeconds(p => p + 1), 1000)
  }, [])

  const stopBreakTimer = useCallback(() => {
    if (breakTimerRef.current) { clearInterval(breakTimerRef.current); breakTimerRef.current = null }
  }, [])

  // On mount: resume timers if checked in
  useEffect(() => {
    if (saved?.isCheckedIn) {
      if (saved.isOnBreak) {
        startBreakTimer()
      } else {
        startDutyTimer()
      }
    }
    return () => { stopDutyTimer(); stopBreakTimer() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Listen for storage changes from other tabs and Firebase changes
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const data = JSON.parse(e.newValue)
          setIsCheckedIn(data.isCheckedIn || false)
          setCheckInTime(data.checkInTime ? new Date(data.checkInTime) : null)
          setCheckOutTime(data.checkOutTime ? new Date(data.checkOutTime) : null)
          setIsOnBreak(data.isOnBreak || false)
          setBreakStartTime(data.breakStartTime ? new Date(data.breakStartTime) : null)
          setBreakCount(data.breakCount || 0)
          setSelectedPost(data.selectedPost || '')
          activeRecordId.current = data.activeRecordId || null
          setActivityLog((data.activityLog || []).map(l => ({
            ...l, timestamp: l.timestamp ? new Date(l.timestamp) : null,
          })))

          // Recompute seconds
          if (data.isCheckedIn) {
            const now = Date.now()
            const savedDuty = data.savedDutySeconds || 0
            const savedBreak = data.savedBreakSeconds || 0
            const pausedAt = data.lastPausedAt ? new Date(data.lastPausedAt).getTime() : now

            if (data.isOnBreak) {
              const breakElapsed = Math.floor((now - (data.breakStartTime ? new Date(data.breakStartTime).getTime() : now)) / 1000)
              setDutySeconds(savedDuty)
              setTotalBreakSeconds(savedBreak + breakElapsed)
              stopDutyTimer(); startBreakTimer()
            } else {
              const dutyElapsed = Math.floor((now - pausedAt) / 1000)
              setDutySeconds(savedDuty + dutyElapsed)
              setTotalBreakSeconds(savedBreak)
              stopBreakTimer(); startDutyTimer()
            }
          } else {
            stopDutyTimer(); stopBreakTimer()
            setDutySeconds(data.savedDutySeconds || 0)
            setTotalBreakSeconds(data.savedBreakSeconds || 0)
          }
        } catch { /* ignore parse errors */ }
      }
      if (e.key === ATTENDANCE_KEY && e.newValue) {
        try { setAttendanceRecords(deserializeRecords(JSON.parse(e.newValue))) } catch { /* */ }
      }
    }
    window.addEventListener('storage', handleStorage)

    // Listen for Firebase shift state changes
    const shiftRef = ref(db, FIREBASE_SHIFT_PATH)
    const attendanceRef = ref(db, FIREBASE_ATTENDANCE_PATH)
    const shiftListener = onValue(shiftRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setIsCheckedIn(data.isCheckedIn || false)
        setCheckInTime(data.checkInTime ? new Date(data.checkInTime) : null)
        setCheckOutTime(data.checkOutTime ? new Date(data.checkOutTime) : null)
        setIsOnBreak(data.isOnBreak || false)
        setBreakStartTime(data.breakStartTime ? new Date(data.breakStartTime) : null)
        setBreakCount(data.breakCount || 0)
        setSelectedPost(data.selectedPost || '')
        activeRecordId.current = data.activeRecordId || null
        setActivityLog((data.activityLog || []).map(l => ({ ...l, timestamp: l.timestamp ? new Date(l.timestamp) : null })))
        // Recompute seconds
        if (data.isCheckedIn) {
          const now = Date.now()
          const savedDuty = data.savedDutySeconds || 0
          const savedBreak = data.savedBreakSeconds || 0
          const pausedAt = data.lastPausedAt ? new Date(data.lastPausedAt).getTime() : now
          if (data.isOnBreak) {
            const breakElapsed = Math.floor((now - (data.breakStartTime ? new Date(data.breakStartTime).getTime() : now)) / 1000)
            setDutySeconds(savedDuty)
            setTotalBreakSeconds(savedBreak + breakElapsed)
            stopDutyTimer(); startBreakTimer()
          } else {
            const dutyElapsed = Math.floor((now - pausedAt) / 1000)
            setDutySeconds(savedDuty + dutyElapsed)
            setTotalBreakSeconds(savedBreak)
            stopBreakTimer(); startDutyTimer()
          }
        } else {
          stopDutyTimer(); stopBreakTimer()
          setDutySeconds(data.savedDutySeconds || 0)
          setTotalBreakSeconds(data.savedBreakSeconds || 0)
        }
      }
    })
    // Listen for Firebase attendance changes
    const attendanceListener = onValue(attendanceRef, (snapshot) => {
      const data = snapshot.val()
      if (data) setAttendanceRecords(deserializeRecords(data))
    })
    return () => {
      window.removeEventListener('storage', handleStorage)
      off(shiftRef, 'value', shiftListener)
      off(attendanceRef, 'value', attendanceListener)
    }
  }, [startDutyTimer, stopDutyTimer, startBreakTimer, stopBreakTimer])

  // ── CHECK IN ──
  const handleCheckIn = useCallback(() => {
    if (!selectedPost) { alert('Please select an assigned post before checking in.'); return }
    if (isCheckedIn) return
    const now = new Date()
    setIsCheckedIn(true)
    setCheckInTime(now)
    setCheckOutTime(null)
    setDutySeconds(0)
    setTotalBreakSeconds(0)
    setBreakCount(0)
    setIsOnBreak(false)
    startDutyTimer()
    addLog('Checked In', now)

    const postNames = { post1: 'Corporate Tower A', post2: 'Retail Center B', post3: 'Residential Gate C' }
    const newId = Date.now()
    activeRecordId.current = newId
    addAttendanceRecord({
      id: newId, date: now, company: postNames[selectedPost] || selectedPost,
      area: '—', checkIn: now, checkOut: null, breakSeconds: 0, dutySeconds: 0, active: true,
    })

    // Persist
    persistShift({
      isCheckedIn: true, checkInTime: now.toISOString(),
      checkOutTime: null, isOnBreak: false, breakStartTime: null,
      breakCount: 0, activeRecordId: newId,
      savedDutySeconds: 0, savedBreakSeconds: 0, lastPausedAt: now.toISOString(),
      activityLog: [{ action: 'Checked In', time: formatTime(now), timestamp: now.toISOString() }],
    })
  }, [selectedPost, isCheckedIn, startDutyTimer, addLog, addAttendanceRecord])

  // ── CHECK OUT ──
  const handleCheckOut = useCallback(() => {
    if (!isCheckedIn) return
    const now = new Date()
    const newLog = [...activityLog]
    if (isOnBreak) {
      setIsOnBreak(false); stopBreakTimer(); setBreakCount(c => c + 1)
      newLog.unshift({ action: 'Break Ended (auto)', time: formatTime(now), timestamp: now })
      addLog('Break Ended (auto)', now)
    }
    stopDutyTimer()
    setIsCheckedIn(false)
    setCheckOutTime(now)
    addLog('Checked Out', now)
    newLog.unshift({ action: 'Checked Out', time: formatTime(now), timestamp: now })

    if (activeRecordId.current) {
      updateAttendanceRecord(activeRecordId.current, {
        checkOut: now, breakSeconds: totalBreakSeconds, dutySeconds: dutySeconds, active: false,
      })
      activeRecordId.current = null
    }

    // Persist
    persistShift({
      isCheckedIn: false, checkInTime: checkInTime?.toISOString() || null,
      checkOutTime: now.toISOString(), isOnBreak: false, breakStartTime: null,
      breakCount: breakCount + (isOnBreak ? 1 : 0), activeRecordId: null,
      savedDutySeconds: dutySeconds, savedBreakSeconds: totalBreakSeconds, lastPausedAt: null,
      activityLog: newLog.map(l => ({ ...l, timestamp: l.timestamp?.toISOString?.() || l.timestamp || null })),
    })
  }, [isCheckedIn, isOnBreak, totalBreakSeconds, dutySeconds, checkInTime, breakCount, selectedPost, activityLog, stopDutyTimer, stopBreakTimer, addLog, updateAttendanceRecord])

  // ── BREAK START ──
  const handleBreakStart = useCallback(() => {
    if (!isCheckedIn || isOnBreak) return
    const now = new Date()
    setIsOnBreak(true); setBreakStartTime(now)
    stopDutyTimer(); startBreakTimer()
    addLog('Break Started', now)

    const newLog = [{ action: 'Break Started', time: formatTime(now), timestamp: now }, ...activityLog]
    persistShift({
      isCheckedIn: true, checkInTime: checkInTime?.toISOString() || null,
      checkOutTime: null, isOnBreak: true, breakStartTime: now.toISOString(),
      breakCount, activeRecordId: activeRecordId.current,
      savedDutySeconds: dutySeconds, savedBreakSeconds: totalBreakSeconds, lastPausedAt: null,
      activityLog: newLog.map(l => ({ ...l, timestamp: l.timestamp?.toISOString?.() || l.timestamp || null })),
    })
  }, [isCheckedIn, isOnBreak, dutySeconds, totalBreakSeconds, checkInTime, breakCount, selectedPost, activityLog, stopDutyTimer, startBreakTimer, addLog])

  // ── BREAK END ──
  const handleBreakEnd = useCallback(() => {
    if (!isCheckedIn || !isOnBreak) return
    const now = new Date()
    setIsOnBreak(false); setBreakCount(c => c + 1)
    stopBreakTimer(); startDutyTimer()
    addLog('Break Ended', now)

    const newLog = [{ action: 'Break Ended', time: formatTime(now), timestamp: now }, ...activityLog]
    persistShift({
      isCheckedIn: true, checkInTime: checkInTime?.toISOString() || null,
      checkOutTime: null, isOnBreak: false, breakStartTime: null,
      breakCount: breakCount + 1, activeRecordId: activeRecordId.current,
      savedDutySeconds: dutySeconds, savedBreakSeconds: totalBreakSeconds, lastPausedAt: now.toISOString(),
      activityLog: newLog.map(l => ({ ...l, timestamp: l.timestamp?.toISOString?.() || l.timestamp || null })),
    })
  }, [isCheckedIn, isOnBreak, dutySeconds, totalBreakSeconds, checkInTime, breakCount, selectedPost, activityLog, stopBreakTimer, startDutyTimer, addLog])

  const shiftState = {
    selectedPost, isCheckedIn, checkInTime, checkOutTime,
    dutySeconds, isOnBreak, breakStartTime, totalBreakSeconds,
    breakCount, activityLog
  }

  const shiftActions = {
    setSelectedPost, handleCheckIn, handleCheckOut,
    handleBreakStart, handleBreakEnd
  }

  return (
    <ShiftContext.Provider value={{
      shiftState, shiftActions,
      attendanceRecords, addAttendanceRecord, updateAttendanceRecord
    }}>
      {children}
    </ShiftContext.Provider>
  )
}

export function useShift() {
  const ctx = useContext(ShiftContext)
  if (!ctx) throw new Error('useShift must be used within ShiftProvider')
  return ctx
}
