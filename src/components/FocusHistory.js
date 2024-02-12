import { View, Text, StyleSheet, FlatList } from "react-native"
import { colors, fontSizes, spacing } from "../utils/constants"

export const FocusHistory = ({ history }) => {
  if (!history) return null

  const renderItem = ({ item }) => {
    return <Text style={styles.item}>{item}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks focused on</Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.white,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: "bold",
  },
})
