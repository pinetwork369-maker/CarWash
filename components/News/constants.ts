import { NewsArticle } from './types';

export const DEFAULT_NEWS: NewsArticle[] = [
  {
    id: 'news1',
    title: 'Nghệ Thuật Chăm Sóc Xe Tại Nhà: Bí Quyết Giữ Xe Luôn Như Mới',
    summary: 'Khám phá quy trình chăm sóc xe chuẩn Detailing ngay tại nhà giúp xế cưng luôn bóng bẩy và bền bỉ theo thời gian.',
    content: `## Chăm Sóc Xe Tại Nhà: Không Chỉ Là Rửa Xe

Việc chăm sóc xe hơi không chỉ là đưa xe đến các trung tâm detailing chuyên nghiệp mà còn bao gồm cả những thói quen bảo dưỡng hàng ngày tại nhà. Dưới đây là quy trình 5 bước chuẩn chuyên gia:

### 1. Quy Trình Rửa Xe 2 Xô (Two-Bucket Method)
Sử dụng phương pháp 2 xô (một xô xà phòng, một xô nước sạch) để hạn chế tối đa việc gây xước xoáy cho bề mặt sơn. Đừng quên sử dụng găng tay rửa xe chuyên dụng (Wash Mitt).

### 2. Kiểm Tra Áp Suất Lốp Định Kỳ
Đảm bảo lốp luôn đủ hơi không chỉ giúp xe vận hành êm ái mà còn tiết kiệm nhiên liệu và tăng tuổi thọ cho lốp.

### 3. Vệ Sinh Nội Thất Chuyên Sâu
Sử dụng máy hút bụi công suất lớn và các dung dịch vệ sinh chuyên dụng cho từng bề mặt (da, nhựa, nỉ) để loại bỏ vi khuẩn và mùi hôi.

### 4. Kiểm Tra Các Loại Dung Dịch Kỹ Thuật
Dầu máy, nước làm mát, nước rửa kính cần được kiểm tra hàng tuần để đảm bảo động cơ luôn hoạt động trong điều kiện tốt nhất.

### 5. Bảo Vệ Bề Mặt Sơn Với Sealant
Sau khi rửa sạch, hãy sử dụng các loại xịt bảo vệ nhanh (Quick Detailer) hoặc Sealant để tạo lớp màng bảo vệ sơn khỏi tia UV và bụi bẩn.

> **Lời khuyên:** Hãy thực hiện quy trình này ít nhất 1 lần/tuần để xe luôn trong tình trạng hoàn hảo nhất.`,
    image: 'https://images.unsplash.com/photo-1552933529-e359b2477252?auto=format&fit=crop&q=80&w=1200',
    author: 'Admin',
    date: '2024-03-20',
    category: 'Kinh nghiệm',
    tags: ['Bảo dưỡng', 'Chăm sóc xe']
  },
  {
    id: 'news2',
    title: 'Phủ Ceramic Hay Dán PPF: Cuộc Chiến Bảo Vệ Sơn Xe Toàn Diện',
    summary: 'Phân tích chuyên sâu giữa hai công nghệ bảo vệ sơn hàng đầu hiện nay để tìm ra giải pháp tối ưu cho xế cưng của bạn.',
    content: `## Lựa Chọn Nào Cho Xế Cưng Của Bạn?

Nhiều chủ xe băn khoăn không biết nên chọn phủ Ceramic hay dán PPF. Thực tế, mỗi phương pháp đều có những ưu điểm vượt trội riêng:

### Phủ Ceramic: Đỉnh Cao Của Sự Bóng Bẩy
*   **Ưu điểm:** Tạo độ bóng sâu như gương, hiệu ứng lá sen (Hydrophobic) cực mạnh giúp chống bám nước và bụi bẩn.
*   **Bảo vệ:** Chống lại tia UV, mưa axit và các hóa chất ăn mòn.
*   **Chi phí:** Hợp lý, phù hợp với đa số người dùng.

### Dán PPF (Paint Protection Film): Giáp Sắt Cho Xe
*   **Ưu điểm:** Khả năng chống trầy xước, đá văng tuyệt vời. Đặc biệt là tính năng **tự phục hồi vết xước nhỏ** khi gặp nhiệt độ cao.
*   **Bảo vệ:** Là lớp màng vật lý dày dặn, bảo vệ sơn gốc khỏi mọi tác động ngoại lực.
*   **Chi phí:** Cao hơn, nhưng giá trị bảo vệ mang lại là tuyệt đối.

### Kết Luận
Nếu bạn ưu tiên độ bóng và dễ vệ sinh, hãy chọn **Ceramic**. Nếu bạn muốn bảo vệ xe khỏi trầy xước và đá văng, **PPF** là lựa chọn không thể thay thế. Thậm chí, nhiều chủ xe còn kết hợp dán PPF và phủ Ceramic lên trên để đạt hiệu quả tối đa.`,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200',
    author: 'Chuyên gia Detailing',
    date: '2024-04-05',
    category: 'Tư vấn',
    tags: ['Ceramic', 'PPF', 'Bảo vệ sơn']
  },
  {
    id: 'news3',
    title: 'Vệ Sinh Khoang Máy: Tại Sao Đây Là "Trái Tim" Của Quy Trình Bảo Dưỡng?',
    summary: 'Khoang máy sạch sẽ không chỉ mang lại vẻ đẹp thẩm mỹ mà còn là yếu tố then chốt giúp động cơ vận hành bền bỉ và an toàn.',
    content: `## Khoang Máy - Nơi Cần Được Quan Tâm Đặc Biệt

Khoang máy thường bị lãng quên vì nó nằm dưới nắp capo, nhưng việc vệ sinh định kỳ mang lại những lợi ích sống còn:

### 1. Tối Ưu Hóa Khả Năng Tản Nhiệt
Bụi bẩn, dầu mỡ bám lâu ngày tạo thành lớp cách nhiệt "bất đắc dĩ", khiến động cơ nóng hơn bình thường. Vệ sinh sạch sẽ giúp các chi tiết tản nhiệt hiệu quả hơn.

### 2. Phát Hiện Sớm Các Sự Cố Kỹ Thuật
Khi khoang máy sạch bóng, bạn sẽ dễ dàng nhận thấy các dấu hiệu rò rỉ dầu, nước làm mát hoặc các vết nứt trên dây curoa, ống cao su trước khi chúng trở thành thảm họa.

### 3. Ngăn Ngừa "Kẻ Thù" Gặm Nhấm
Chuột và côn trùng rất thích trú ngụ trong những khoang máy bẩn và ấm áp. Vệ sinh sạch sẽ kết hợp xịt chống chuột sẽ bảo vệ hệ thống dây điện đắt tiền của bạn.

### 4. Giữ Gìn Giá Trị Xe
Một chiếc xe có khoang máy được chăm sóc kỹ lưỡng luôn có giá trị chuyển nhượng cao hơn và tạo niềm tin tuyệt đối cho người mua lại.

> **Lưu ý:** Quy trình vệ sinh khoang máy cần được thực hiện bởi các kỹ thuật viên có tay nghề để đảm bảo an toàn cho các linh kiện điện tử nhạy cảm.`,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1200',
    author: 'Kỹ thuật viên',
    date: '2024-05-12',
    category: 'Kỹ thuật',
    tags: ['Khoang máy', 'Bảo dưỡng']
  }
];
