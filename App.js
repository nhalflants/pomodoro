import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native"
import { Focus } from "./src/components/Focus"
import Timer from "./src/components/Timer"
import { colors } from "./src/utils/constants"
import { FocusHistory } from "./src/components/FocusHistory"

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null)
  const [history, setHistory] = useState([])
  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subject) => setHistory((prev) => [...prev, subject])}
          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})
