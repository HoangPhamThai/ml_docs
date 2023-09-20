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

#### Phát biểu bài toán:

Bài toán được phát biểu như sau: Cho tập các item $I = i_0, i_1, ... , i_{m-1}$ và tập các giao dịch $D = t_0, t_1, ... , t_{n-1}$. Tìm các luật dạng:

$$
X \rightarrow Y
$$

với $X, Y \in I$ và $X \cap Y = \emptyset$, thoả:

$$
supp(X \rightarrow Y) \geq minsupp, conf(X \rightarrow Y) \geq minconf
$$

#### Thuật toán:

Thuật toán Apriori gồm 2 luật chính:

1. **Luật Join**: tạo (k+1)-itemset từ tập k-itemsets bằng cách ghép các item của itemset đó với chính nó. Tập (k+1)-items này được gọi là tập candidate.
2. **Luật Prune**:

   2.1. Với mỗi itemset A trong tập candidate, xét itemset đó trong toàn bộ database, nếu $supp(A) < minsupp$, thì bỏ A khỏi tập candidate.

   2.2. A là một itemset phổ biến khi và chỉ khi mọi tập con của A cũng phổ biến.

Gọi $C_k$ là tập candidate chứa k item, $L_k$ là tập k-itemset phổ biến, mã giả của thuật toán Apriori như sau:

:::info Thuật toán Apriori
**Input:** Database $D$, $minsupp$

**Apriori($D$, $minsupp$)**

&emsp; $L_1 \leftarrow$ 1-itemset phổ biến;

&emsp; $k \leftarrow 2$

&emsp;&emsp; **while** $L_{k-1}$ **is not empty**

&emsp;&emsp;&emsp; $C_k \leftarrow$ AprioriGen($L_{k-1}$, $k$)

&emsp;&emsp;&emsp; **for** transaction $t$ **in** $D$

&emsp;&emsp;&emsp;&emsp; $T_t \leftarrow \{c \in C_k , c \subseteq t\}$

&emsp;&emsp;&emsp;&emsp; **for** candidates $c$ **in** $T_t$

&emsp;&emsp;&emsp;&emsp;&emsp; count[$c$] $\leftarrow$ count[$c$] + 1

&emsp;&emsp;&emsp; $L_k \leftarrow \{c \in C_k, count[c] \geq minsupp\}$ // Luật prune 2.1

&emsp;&emsp;&emsp; $k \leftarrow k + 1$

**ApprioriGen($L$, $k$)**

&emsp; result $\leftarrow$ list()

&emsp; **for all** $p \in L$, $q \in L$ **where** $p_1 = q_1$, $p_2 = q_2$, ..., $p_{k-2} = q_{k-2}$ **and** $p_{k-1} < q_{k-1}$ // Luật join

&emsp;&emsp; $c \leftarrow p \cup \{q_{k-1}\}$

&emsp;&emsp; **if** $u \in L$ **for all** $u \subseteq c$ **where** $|u| = k-1$ // Luật prune 2.2

&emsp;&emsp;&emsp; result.add($c$)

&emsp; **return** result
:::

Thuật toán Apriori được diễn giải như sau:

1. Tạo tập 1-itemset phổ biến $L_1$. Từ tập này sẽ tạo ra các tập k-itemset phổ biến khác.
2. Gán k = 2, bắt đầu quá trình tìm các tập k-itemset phổ biến, quá trình dừng khi không tìm được tập k-itemset phổ biến nào nữa ($L_{k-1} = \emptyset$).
3. Tạo tập candidate $C_k$ từ tập $L_{k-1}$ và $k$ bằng hàm **ApprioriGen($L$, $k$)**.

   3.1. Khởi tạo biến result trả về là list rỗng.

   3.2. Thực hiện **luật join**: với mỗi itemset $p,q \in L$ với $p_1 = q_1$, $p_2 = q_2$, ..., $p_{k-2} = q_{k-2}$ và $p_{k-1} < q_{k-1}$, $p_i$ và $q_i$ lần lượt là phần tử thứ $i$ trong $p$ và $q$, $1 \leq i \leq k-1$. Điều kiện $p_{k-1} < q_{k-1}$ đảm bảo không có phần tử trùng nhau trong tập candidate.

   3.3. Với mỗi $p$, $q$ thoả luật join, tạo set $c \leftarrow p \cup \{q_{k-1}\}$, tức là nạp phần tử cuối cùng của $q$ vào $p$. Set $c$ có thể được nạp vào result để thành phần tử trong tập candidate.

   3.4. Xét $c$ có thoả **luật prune 2.2**: xét tất cả các tập con $u$ của $c$ với kích thước $k-1$, nếu $u \in L$ tức là $u$ là một (k-1)-itemset phổ biến thì nạp $c$ và result.

   3.5. Trả kết quả result.

4. Tại bước này, ta thu được tập k-candidate. Bắt đầu kiểm tra **luật prune 2.1**.

5. Vói mỗi transaction $t$ trong $D$:

   5.1. Tạo tập $T_t \leftarrow \{c \in C_k , c \subseteq t\}$ là một phần tử trong tập candidate $C_k$ mà phần tử đó nằm trong một transaction $t$.

   5.2. Tăng số lần xuất hiện của $T_t$ lên 1.

6. Thực hiện **luật prune 2.1**: tạo $L_k$ là k-itemset phổ biến: với mỗi phần tử $c$ nằm trong tập candidate $C_k$ thoả số lần xuất hiện của $c$ lớn hơn hoặc bằng $minsupp$.

7. Tăng $k$ lên 1 và quay lại Bước 2.

#### Ví dụ:

Xét database $D$ như sau, với $minsupp = 3$:

| $D$       |
| --------- |
| {1,2,3,4} |
| {1,2,4}   |
| {1,2}     |
| {2,3,4}   |
| {2,3}     |
| {3,4}     |
| {2,4}     |

Tạo $L_1$:

| $L_1$ |
| ----- | ---- |
| item  | supp |
| {1}   | 3    |
| {2}   | 6    |
| {3}   | 4    |
| {4}   | 5    |

Với $k = 2$, vì $L_1 \neq \emptyset$ nên tạo tập candidate $C_2$:

- Khởi tạo result là mảng rỗng.
- $p = {1}$, $q = {1}$ có $p_1 = q_1 = 1$: không thoả luật join.
- $p = {1}$, $q = {2}$ có $p_1 < q_1$: thoả luật join.
  - $c = p \cup {q_{k-1}} = \{1\} \cup \{2\} = \{1,2\}$
  - Xét luật prune 2.2: mọi tập $u \subseteq c$ có độ dài 1 là $\{1\}$, $\{2\}$, 2 tập này đều thuộc $L_1$.
  - Gắn $c$ vào result, lúc này result = $[\{1,2\}]$
- Làm tương tự với các cặp $p,q$ khác, ta được tập candidata $C_2$:

Tạo $C_2$:

| $C_2$ |
| ----- |
| {1,2} |
| {1,3} |
| {1,4} |
| {2,3} |
| {2,4} |
| {3,4} |

Xét các transaction $t \in D$:

- $t = \{1,2,3,4\}$
  - $T_t = \{\{1,2\}, \{1,3\}, \{1,4\}, \{2,3\}, \{2,4\}, \{3,4\}\}$ với mỗi phần tử là tập con của $t$ và thuộc $C_2$.
  - Với mỗi tập con $c \in T_t$, tăng $count[c]$ là số lần đếm của mỗi phần tử lên 1.
- $t = \{1,2,4\}$
  - $T_t = \{\{1,2\}, \{1,4\}, \{2,4\}\}$ với mỗi phần tử là tập con của $t$ và thuộc $C_2$.
  - Với mỗi tập con $c \in T_t$, tăng $count[c]$ là số lần đếm của mỗi phần tử lên 1.
- Làm tương tự cho đến $t$ cuối cùng trong $D$.

Lúc này $count$ như sau:

| $count$ |
| ------- | --- |
| {1,2}   | 3   |
| {1,3}   | 1   |
| {1,4}   | 2   |
| {2,3}   | 3   |
| {2,4}   | 4   |
| {3,4}   | 3   |

Tạo $L_2$: lấy các phần tử $c \in C_2$, thoả $count[c] \geq minsupp$, ta có:

| $L_2$ |
| ----- | --- |
| {1,2} | 3   |
| {2,3} | 3   |
| {2,4} | 4   |
| {3,4} | 3   |

Tăng $k$ lên 1 và bắt đầu lại quy trình cho đến khi $L_k = \emptyset$.

Kết quả cuối cùng nhận được:

| $L_1$ | $C_2$ | $L_2$ | $C_3$   | $L_3$ |
| ----- | ----- | ----- | ------- | ----- |
| {1}   | {1,2} | {1,2} | {1,2,3} | {}    |
| {2}   | {1,3} | {2,3} | {1,2,4} |
| {3}   | {1,4} | {3,4} | {2,3,4} |
| {4}   | {2,3} |
|       | {2,4} |
|       | {3,4} |

### 2.3. Ưu và nhược điểm:

#### Ưu điểm:
- Thuật toán dễ hiểu, dễ triển khai, áp dụng được trên tập dữ liệu lớn.

#### Nhược điểm:
- Chi phí tính toán lớn với số lượng itemset lớn và $minsupp$ nhỏ.

#### Các phương pháp cải thiện:
- Giảm số lượng transaction: transaction không chứa những item phổ biến sẽ bị loại khỏi thuật toán.
- Dùng cấu trúc dữ liệu hợp lý.
- Chọn random tập $S$ từ $D$, chấp nhận các local itemset phổ biến.

