export const loadingMessages = [
  "Đang phân tích cấu trúc não bộ... 🧠",
  "Đang tham khảo ý kiến các nhà khoa học hàng đầu... 🔬",
  "Đang chạy chẩn đoán nhận thức nâng cao... 💻",
  "Đang đo lường tiềm năng trí tuệ của bạn... 📊",
  "Kết quả có thể gây 'sát thương' tâm hồn... 😳",
  "Đang so sánh đáp án với các thiên tài thế giới... 🌍",
  "Phát hiện chỉ số thông minh cảm xúc cực cao... 💕",
  "Đang hiệu chuẩn thuật toán IQ... ⚙️",
  "Đang rà soát các nếp nhăn não bộ... 🕸️",
  "Đang xử lý sóng não độc nhất của bạn... 🌊",
  "Đang tính toán mức độ 'vô tri' tiềm ẩn... ✨",
  "Đang hội ý với hội đồng thông thái... 👩‍🔬",
  "Đang kiểm tra lại các phép tính... đợi chút nhé... ⏳",
  "Sắp xong rồi... (có lẽ vậy)... 🤔",
  "Đang chuẩn bị kết quả cho bạn... 📜",
];

export const getRandomLoadingMessages = (count: number = 5): string[] => {
  const shuffled = [...loadingMessages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
