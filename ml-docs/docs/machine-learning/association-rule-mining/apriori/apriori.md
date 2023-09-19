import Figure from '/src/components/Figure/figure.jsx'
import Equation from '/src/components/Equation/equation.jsx'

# Apriori

## 1. Dẫn nhập

Hiện nay, một lượng lớn dữ liệu được thu thập hằng ngày từ nhiều lĩnh vực như tài chính, quản lý, ngân hàng, y tế,... Các dữ liệu thể hiện rất nhiều những mối tương quan phức tạp với nhau và chứa đựng những tiềm năng lớn để khai thác, nắm bắt tính chất, hành vi của thực thể (người dùng, giao dịch,...) nhằm nâng cao lợi nhuận và giảm chi phí. Điều đó dẫn đến sự phát triển của nhiều thuật toán khai phá sự tương quan giữa các đặc trưng trong dữ liệu.

**Khai phá luật kết hợp** (Association rule mining) là một kỹ thuật để xác định mối quan hệ giữa các giao dịch (transaction) có các hạng mục (item). Việc xác định mối quan hệ giữa các hạng mục trong các giao dịch khác nhau có thể dẫn đến tăng lợi nhuận thu được. Các ví dụ dễ thấy là việc kết hợp mua kem đánh răng với bàn chải, mua máy tính kết hợp phần mềm diệt virus,... Nói cách khác, nếu sản phẩm A và B được mua cùng nhau thường xuyên thì có thể thực hiện các bước sau để tăng lợi nhuận:

- Đặt A và B gần nhau.
- Tổ chức các chiến dịch quảng cáo cho những khách hàng mua một trong các sản phẩm A hoặc B.
- Giảm giá nếu khách hàng mua cả hai sản phẩm.
- Đóng gói chung A và B.

Một trong những phương pháp của khai phá luật kết hợp là **Apriori**, thuộc nhóm Unsupervised Learning, được thiết kế để hoạt động trên các cơn sở dữ liệu chứa các giao dịch.

## 2. Thuật toán Apriori

### 2.1. Các thuật ngữ

- **Hạng mục** (item): thành phần cơ bản của mô hình, ví dụ một sản phẩm (táo, sữa, ...), hoặc một dịch vụ (tư vấn mua nhà, tư vấn vay, tư vấn làm thẻ ngân hàng, ...).
- **Tập các hạng mục** (itemset): một tập các hạng mục, ví dụ {bàn chải, kem đánh răng}.
- **Giao dịch** (transaction): một tập các item, có mã ID riêng biệt.
- **Item phổ biến**: itemset xuất hiện thường xuyên trong tập dữ liệu các giao dịch.
- **k-itemset**: tập gồm k các itemset, ví dụ: 1-itemset: {táo, lê}, 2-itemset: {{táo, lê}, {bàn chải, kem đánh răng}, {dầu gội, sữa tắm}}.
- **Itemset phổ biến**: tập các itemset có độ phổ biến lớn hơn hoặc bằng độ phổ biến tối thiểu (về độ phổ biến, xem phần [Support](#support)):

<Equation 
equation="
supp(A) \geq minsupp
"
eqId="2.1"
/>

Gọi $D$ là tập các transaction có các transaction ID được ký hiệu là $TID$. Có 3 thành phần chính trong thuật toán apriori:

- **Support**.
- **Confidence**.
- **Lift**.

#### 2.1.1. Support:

Support của một itemset $A$ là mức độ phổ biến mặc định của itemset đó, được tính bằng công thức [2.2](#eq2.2):

<Equation 
equation="
supp(A) = \frac{|A|}{|D|}
"
eqId="2.2"
/>

trong đó:

- $|A|$: tổng số transaction có $A$.
- $|D|$: tổng số transaction trong D.

Như vậy, có thể xem $supp(A)$ là xác suất xuất hiện của $A$ trong $D$.

Từ đó ta có 2 thuật ngữ:

- **Tập phổ biến lớn nhất** (max pattern): itemset $X$ được gọi là tập phổ biến lớn nhất khi:

<Equation 
equation="
\begin{cases}
   supp(X) \geq minsupp \\
   \nexists X', |X'| > |X| \; với \; supp(X') \geq minsupp
\end{cases}
"
eqId="2.3"
/>

với $minsupp$ là giá trị support tối thiểu do người dùng xác định, ví dụ 40% hoặc số lần xuất hiện là 5.

- Tập phổ biến đóng (closed pattern): itemset $X$ được gọi là tập phổ biến đóng khi:

<Equation 
equation="
\begin{cases}
   supp(X) \geq minsupp \\
   \nexists X', |X'| > |X| \; mà \; supp(X') = supp(X)
\end{cases}
"
eqId="2.4"
/>

#### 2.1.2. Confidence:

Confidence đề cập đến khả năng một itemset $B \in I$ cũng có mặt nếu $A$ có mặt. Đây gọi là **luật kết hơp** (association rule) và được ký hiệu là $A \rightarrow B$. Công thức của confidence được thể hiện ở phương trình [2.5](#eq2.5):

<Equation 
equation="
conf(A \rightarrow B) = \frac{|A \cap B|}{|A|} = \frac{|A \cap B||D|}{|A||D|} = \frac{supp(A \cap B)}{supp(A)}
"
eqId="2.5"
/>

trong đó: $|A \rightarrow B|$: tổng số transaction có cả A và B.

#### 2.1.3. Lift:

Lift (công thức [2.6](#eq2.6)) đề cập đến sự gia tăng tỷ lệ phổ biến của $B$ khi $A$ xuất hiện:
<Equation 
equation="
lift(A \rightarrow B) = \frac{conf(A \rightarrow B)}{supp(B)} =  \frac{supp(A \cap B)}{supp(A)supp(B)}
"
eqId="2.6"
/>

Giá trị $lift(A \rightarrow B)$ thể hiện sự chênh lệch khả năng xuất hiện của $A \cap B$ và $B$.

Từ [2.4](#eq2.4), [2.5](#eq2.5), và [2.6](#eq2.6), dễ thấy rằng:

<Equation 
equation="
lift(A \rightarrow B) = lift(B \rightarrow A)
"
eqId="2.7"
/>

Ta có các trường hợp sau:

1. $lift(A \rightarrow B) = 1$: $A$ và $B$ là độc lập thống kê, không có liên kết với nhau.
2. $lift(A \rightarrow B) > 1$: $A$ và $B$ có khả năng xuất hiện cùng nhau.
3. $lift(A \rightarrow B) <> 1$: $A$ và $B$ không được xuất hiện cùng nhau, có $A$ thì không có $B$.

### 2.2. Bài toán khai thác luật kết hợp

Đối với các bộ dữ liệu lớn với hàng trăm item trong trăm nghìn giao dịch, thuật toán Apriori sẽ tính toán các quy tắc cho mỗi kết hợp của các mục có thể có, dẫn đến chi phí tính toán lớn. Để tăng tốc quá trình, ta đặt các giá trị tối thiểu cho support (minsupp) và cho confidence (minconf), nghĩa là chỉ quan tâm đến việc tìm kiếm các quy tắc cho các item có sự tồn tại mặc định nhất định (support) và có giá trị tối thiểu cho sự xuất hiện cùng các các item khác (confidence).

Bài toán được phát biểu như sau: Cho tập các item $I = i_0, i_1, ... , i_{m-1}$ và tập các giao dịch $D = t_0, t_1, ... , t_{n-1}$. Tìm các luật dạng:

$$
X \rightarrow Y 
$$

với $X, Y \in I$ và $X \cap Y = \emptyset$, thoả:

$$
supp(X \rightarrow Y) \geq minsupp, conf(X \rightarrow Y) \geq minconf
$$