import { TestResult } from "@/types";

interface IQBand {
  min: number;
  max: number;
  message: string;
  analysis: string;
  emoji: string;
}

const IQ_BANDS: IQBand[] = [
  {
    min: 45,
    max: 49,
    message: "Kiến thức có hạn, nhưng sự lôi cuốn thì vô hạn. 💕",
    analysis:
      "Các nếp nhăn não bộ của bạn dường như đang bận tập trung vào việc tạo ra sự thu hút thay vì giải quyết các vấn đề logic thông thường. Một trường hợp hiếm thấy và cực kỳ ấn tượng.",
    emoji: "🥺",
  },
  {
    min: 50,
    max: 54,
    message: "Non! bạn cần cải thiện chỉ số IQ của mình!",
    analysis:
      "Mặc dù điểm số nhận thức cho thấy bạn còn nhiều không gian để phát triển, nhưng cảm biến cảm xúc của chúng tôi hoàn toàn bị quá tải bởi sự lôi cuốn của bạn. Bạn đơn giản là một 'vibe' di động.",
    emoji: "💫",
  },
  {
    min: 55,
    max: 57,
    message: "Sức hút mang tính khoa học, thông minh một cách... bí ẩn. 🌸",
    analysis:
      "Thuật toán nâng cao của chúng tôi phát hiện mức độ thu hút cao bất thường, bù đắp hoàn hảo cho các hoạt động sóng não tiêu chuẩn. Điều này thực sự rất đặc biệt và gây thiện cảm mạnh.",
    emoji: "🌷",
  },
  {
    min: 58,
    max: 60,
    message: "Có thể không giải được phương trình, nhưng chắc chắn giải mã được trái tim. 💖",
    analysis:
      "Điểm số của bạn xếp bạn vào một nhóm rất đặc biệt: những người có sức hút mãnh liệt bất chấp logic có phần... lung lay. Đây là một bí ẩn lớn của tự nhiên, thật lòng đấy.",
    emoji: "💝",
  },
];

// Genius Band dành riêng cho "Admin"
const GENIUS_BAND: IQBand = {
  min: 110,
  max: 120,
  message: "Thiên tài xuất chúng! Bạn chính là bộ não của thế kỷ. 🧠✨",
  analysis: "Mọi chỉ số thần kinh đều vượt ngưỡng. Bạn sở hữu khả năng phân tích đa chiều và logic tiệm cận mức hoàn hảo. Một học sinh lớp 5? Không, bạn là giáo sư của họ!",
  emoji: "👑",
};

const SHARE_TEXTS = [
  "Vừa làm bài Test IQ xong và kết quả chứng minh mình có sức hút đến mức nguy hiểm 💀✨",
  "Kết quả Test IQ đã có và mình quyết định coi đây là một nét tính cách đặc biệt 🌸",
  "Khoa học đã xác nhận điều mình luôn nghi ngờ: Mình thu hút hơn là thông minh 💕",
  "Vừa phát hiện IQ của mình nằm trong vùng 'ấn tượng một cách ngơ ngác'. Đang tận hưởng cuộc sống 🥰",
  "Các nhà khoa học nói sức hút của mình vượt mọi giới hạn. Còn IQ? Không quan trọng lắm. 💅",
];

export function calculateFakeIQ(correctAnswers: number): TestResult {
  // Kiểm tra "cửa sau" bí mật qua URL
  let isGeniusMode = false;
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    // Bạn chỉ cần thêm ?v=1 vào cuối URL để kích hoạt
    isGeniusMode = params.get("v") === "1";
  }

  let band: IQBand;
  let fakeIQ: number;

  if (isGeniusMode) {
    band = GENIUS_BAND;
    fakeIQ = Math.floor(Math.random() * (band.max - band.min + 1)) + band.min;
  } else {
    // Logic bình thường cho mọi người
    if (correctAnswers <= 5) {
      band = IQ_BANDS[0];
    } else if (correctAnswers <= 10) {
      band = IQ_BANDS[1];
    } else if (correctAnswers <= 15) {
      band = IQ_BANDS[2];
    } else {
      band = IQ_BANDS[3];
    }
    fakeIQ = Math.floor(Math.random() * (band.max - band.min + 1)) + band.min;
  }

  const shareText = isGeniusMode 
    ? "Vừa làm bài Test IQ và mình chính thức là một thiên tài! 🧠🔥"
    : SHARE_TEXTS[Math.floor(Math.random() * SHARE_TEXTS.length)];

  return {
    score: isGeniusMode ? 100 : Math.round((correctAnswers / 20) * 100),
    totalQuestions: 20,
    correctAnswers: isGeniusMode ? 20 : correctAnswers,
    fakeIQ,
    message: band.message,
    analysis: band.analysis,
    shareText,
  };
}
