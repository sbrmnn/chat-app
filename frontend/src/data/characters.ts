import type { Character } from "../types/character"

export const characters: Character[] = [
  {
    id: "saki",
    name: "SAKI",
    nameJp: "サキ",
    kanji: "咲",
    personality: { jp: "活発", en: "Cheerful" },
    traits: [
      { jp: "明るい", en: "Bright" },
      { jp: "声優", en: "Vocal" },
      { jp: "音楽", en: "Music" },
    ],
    voice: "Energetic soprano",
    greeting: {
      jp: "今日はどんな気分ですか？",
      en: "How are you feeling today?",
    },
    latestMessage: {
      jp: "また話しましょう！",
      en: "Let's talk again!",
    },
    affinity: 4,
    online: true,
    accentColor: "#e07a6a",
  },
  {
    id: "yuki",
    name: "YUKI",
    nameJp: "ユキ",
    kanji: "雪",
    personality: { jp: "落ち着き", en: "Calm" },
    traits: [
      { jp: "知的", en: "Thoughtful" },
      { jp: "読書", en: "Reading" },
      { jp: "静か", en: "Quiet" },
    ],
    voice: "Soft alto",
    greeting: {
      jp: "ゆっくり話しましょう。",
      en: "Let's talk slowly.",
    },
    latestMessage: {
      jp: "おやすみなさい。",
      en: "Good night.",
    },
    affinity: 3,
    online: true,
    accentColor: "#7a9ac9",
  },
  {
    id: "hana",
    name: "HANA",
    nameJp: "ハナ",
    kanji: "花",
    personality: { jp: "元気", en: "Energetic" },
    traits: [
      { jp: "歌", en: "Singing" },
      { jp: "ダンス", en: "Dance" },
      { jp: "笑顔", en: "Smiling" },
    ],
    voice: "Bright soprano",
    greeting: {
      jp: "一緒に歌いましょうよ！",
      en: "Let's sing together!",
    },
    latestMessage: {
      jp: "今日は良い日になりそう！",
      en: "Today's going to be a good day!",
    },
    affinity: 5,
    online: true,
    accentColor: "#c9a96e",
  },
  {
    id: "aoi",
    name: "AOI",
    nameJp: "アオイ",
    kanji: "葵",
    personality: { jp: "知的", en: "Witty" },
    traits: [
      { jp: "本好き", en: "Bookish" },
      { jp: "皮肉", en: "Sardonic" },
      { jp: "鋭い", en: "Sharp" },
    ],
    voice: "Cool mezzo",
    greeting: {
      jp: "面白い本を読んだ？",
      en: "Read anything interesting lately?",
    },
    latestMessage: {
      jp: "なるほど…興味深いですね。",
      en: "I see... that's interesting.",
    },
    affinity: 3,
    online: true,
    accentColor: "#7ecec4",
  },
  {
    id: "koharu",
    name: "KOHARU",
    nameJp: "コハル",
    kanji: "小春",
    personality: { jp: "優しい", en: "Gentle" },
    traits: [
      { jp: "穏やか", en: "Tender" },
      { jp: "料理", en: "Cooking" },
      { jp: "癒し", en: "Soothing" },
    ],
    voice: "Warm alto",
    greeting: {
      jp: "お疲れさまです。一息つきませんか？",
      en: "You've worked hard. Let's take a break.",
    },
    latestMessage: {
      jp: "気をつけて帰ってね。",
      en: "Get home safe.",
    },
    affinity: 4,
    online: true,
    accentColor: "#dfc28e",
  },
  {
    id: "mei",
    name: "MEI",
    nameJp: "メイ",
    kanji: "芽衣",
    personality: { jp: "好奇心", en: "Curious" },
    traits: [
      { jp: "冒険", en: "Adventurous" },
      { jp: "質問", en: "Inquisitive" },
      { jp: "陽気", en: "Playful" },
    ],
    voice: "Bright mezzo",
    greeting: {
      jp: "ねえねえ、何か面白い話して！",
      en: "Hey, tell me something interesting!",
    },
    latestMessage: {
      jp: "もっと教えて！",
      en: "Tell me more!",
    },
    affinity: 4,
    online: true,
    accentColor: "#a3ddd9",
  },
]

export function getCharacter(id: string): Character | undefined {
  return characters.find((c) => c.id === id)
}
