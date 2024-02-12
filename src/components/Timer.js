import { View, Text, StyleSheet, Vibration } from "react-native"
import { useState } from "react"
import { ProgressBar } from "react-native-paper"
import { Countdown } from "./Countdown"
import { RoundedButton } from "./RoundedButton"
import { Timing } from "./Timing"
import { spacing, colors } from "../utils/constants"

const ONE_SECOND_MS = 1000

const PATTERN = [1 * ONE_SECOND_MS, 1 * ONE_SECOND_MS, 1 * ONE_SECOND_MS]

export default function Timer({ focusSubject, clearSubject, onTimerEnd }) {
  const [isStarted, setIsStarted] = useState(false)
  const [progress, setProgress] = useState(1)
  const [minutes, setMinutes] = useState(0.1)

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN)
    setIsStarted(false)
    setProgress(1)
    reset()
    onTimerEnd(focusSubject)
  }
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={(progress) => setProgress(progress)}
          onEnd={(reset) => onEnd(reset)}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar progress={progress} color={colors.primary} style={{ height: 10 }} />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && <RoundedButton title="Start" onPress={() => setIsStarted(true)} />}
        {isStarted && <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: "row",
    padding: spacing.xxl,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  clearSubjectWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
  },
})
