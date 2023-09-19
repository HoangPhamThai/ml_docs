import Figure from '/src/components/Figure/figure.jsx'

# Random Forest

Có thể thấy rằng mô hình Cây Quyết định có một số hạn chế như quá khớp dữ liệu và cực kỳ nhạy với những thay đổi của dữ liệu, một sự thay đổi nhỏ cũng có thể làm kết quả phân loại bị sai lệch. Mô hình Rừng Ngẫu nhiên có thể khắc phục các hạn chế này. 

Mô hình Rừng Ngẫu nhiên là một tập hợp nhiều mô hình Cây Quyết định - Decision Tree, trong đó mỗi cây có cấu trúc khác nhau, thực hiện một công việc phân loại/hồi quy. Kết quả của Rừng Ngẫu nhiên là kết quả được dự đoán nhiều nhất (trong bài toán phân loại) hoặc trung bình của các kết quả (trong bài toán hồi quy) của các cây. 

Ý tưởng của Rừng Ngẫu nhiên là mỗi cây có thể làm một dự đoán tương đối tốt, nhưng có khả năng quá khớp một phần dữ liệu, nếu xây dựng và kết hợp nhiều cây, các cây đều hoạt động tốt và vượt trội theo nhiều cách khác nhau, thì việc quá khớp có thể giảm, như vậy quá trình phân loại đạt kết quả tốt hơn.

Mô hình Rừng ngẫu nhiên là một công cụ hữu ích có tính ứng dụng cao trong phân loại ảnh, chẩn đoán bệnh, phát hiện giao dịch gian lận,... 
	
<Figure caption="Quá trình xây dựng và phân loại với Rừng ngẫu nhiên" src="/img/random-forest/create-random-forest.png" figId="1.1"/>

Quá trình xây dựng mô hình Rừng Ngẫu nhiên được hiển thị ở Hình [1.1](#fig1.1), gồm các bước:
- Bước 1: Chọn ngẫu nhiên một phần dữ liệu trong tập huấn luyện. Bước này gọi là lấy mẫu **bootstrap**.
- Bước 2: Xây dựng cây quyết định dựa trên phần dữ liệu đó.
- Bước 3: Lặp lại Bước 1 và Bước 2 $n$ lần. Sau bước này, ta có $n$ cây quyết định.
- Bước 4: Kết hợp các cây quyết định lại thành một rừng ngẫu nhiên.

Việc chọn ngẫu nhiên một phần dữ liệu để xây dựng một cây quyết định kéo theo việc các cây quyết định có cấu trúc khác nhau. Có hai cách để chọn ngẫu nhiên dữ liệu:
- Chọn ngẫu nhiên một số điểm dữ liệu.
- Chọn ngẫu nhiên $k$ thuộc tính trong tổng số $m$ thuộc tính của tập dữ liệu.

Theo cách lấy ngẫu nhiên này, một số điểm dữ liệu có thể được lặp lại, hoặc cũng có thể chưa được dùng để huấn luyện. Ví dụ, tập dữ liệu có 4 mẫu từ 1 đến 4, thì một mẫu bootstrap có thể là $[2,3,3,4]$, mẫu khác có thể là $[1,2,4,4]$. Giá trị mặc định của $k$ là $k=\sqrt{m}$.

Một đối tượng được phân loại như sau: từng cây trong rừng sẽ phân loại đối tượng này và ra một kết quả dự đoán khác nhau, kết quả phân loại cuối cùng là dự đoán chiếm đa số các dự đoán của $n$ cây quyết định. Cách chọn kết quả này được gọi là **Bagging** (Bootstrap aggregation).

## Ưu điểm và hạn chế của Rừng Ngẫu nhiên

Ưu điểm lớn nhất của Rừng Ngẫu nhiên là sử dụng được khả năng phân loại tốt của Cây Quyết định và giảm hiện tượng quá khớp dữ liệu mà Cây Quyết định dễ mắc phải. Ngoài ra, mô hình này cũng thừa hưởng các điểm mạnh của Cây Quyết định như:

- Xử lý tốt các dữ liệu bị thiếu.
- Không cần nhiều bước tiền xử lý dữ liệu.
- Rừng Ngẫu nhiên ít bị quá khớp dữ liệu do lấy dự đoán phổ biến nhất của tất cả các dự đoán, bỏ các điểm lệch (bias).

Tuy nhiên, mô hình này cũng có những hạn chế sau:

- Khó hiểu và khó giải thích do số lượng cây nhiều, việc tìm ra luật để phân loại đối tượng rất phức tạp.
- Tốn nhiều thời gian để huấn luyện và phân loại.