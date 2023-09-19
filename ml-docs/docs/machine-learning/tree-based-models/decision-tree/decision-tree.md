import Figure from '/src/components/Figure/figure.jsx'
import Equation from '/src/components/Equation/equation.jsx'

# Decision Tree

Cây quyết định (Decision Tree) là một mô hình học máy có giám sát, được dùng cho các bài toán phân loại và hồi quy. Mô hình Cây quyết định là một công cụ hữu ích có tính ứng dụng cao trong nhiều lĩnh vực như phân tích dữ liệu khách hàng, đưa ra quyết định marketing, lập phác đồ điều trị bệnh,...

## 1. Cấu trúc mô hình Cây quyết định

<Figure caption="Ví dụ về Cây quyết định" src="/img/decision-tree/decision-tree-example.png" figId="1.1"/>

Cấu trúc của một Cây Quyết định được mô tả ở Hình [1.1](#fig1.1), bao gồm:

- Các nút với mỗi nút là một thuộc tính.
- Các nhánh với mỗi nhánh là kết quả của một hàm phân loại cho một thuộc tính.

:::info Có 3 loại nút

- **Nút rễ**: nút đầu tiên trên cùng, không có nhánh nào đi vào nó và có nhiều nhánh đi ra nó. Từ nút rễ có thể dẫn đến nút trung gian hoặc nút lá.
- **Nút trung gian**: các nút nằm ở giữa của cây, mỗi nút trung gian chỉ có một nhánh đi vào nó và có nhiều nhánh đi ra nó. Từ nút trung gian có thể đi đến nút lá.
- **Nút lá**: nút chỉ có một nhánh đi vào nó và không có nhánh nào đi ra nó.

:::

Việc phân loại một đối tượng bằng Cây Quyết định được thực hiện như sau: ta bắt đầu từ nút rễ, thực hiện phân loại theo thuộc tính được xác định tại nút đó, và đi theo nhánh chứa kết quả tương ứng để đến nút khác, quá trình được lặp lại cho đến khi ta đến được nút lá, khi đó đối tượng được phân loại vào lớp có số lượng phần tử chiếm đa số trong nút lá đó. Ví dụ trong Hình [1.1](#fig1.1), một đối tượng có các giá trị thuộc tính (Ngoài trời = Nắng, Nhiệt độ = Nóng, Độ ẩm = Cao, Gió = Mạnh) sẽ được phân loại là "Không".

Từ một tập các thuộc tính, ta có thể xây dựng được nhiều Cây Quyết định khác nhau. Như vậy, mục tiêu là phải tìm được các xây tối ưu sao cho đạt độ chính xác cao nhất và sai số tổng quát hóa thấp nhất. Ta cần phải trả lời các câu hỏi sau:

1. Thuộc tính nào cần được chọn cho một nút của cây?
2. Các xây dựng một cây?
3. Điều kiện dừng phân chia một nút?

## 2. Cách chọn thuộc tính cho một nút của cây

Mỗi thuộc tính của đối tượng được đánh giá dựa vào hiệu quả mà nó phân loại đối tượng. Mục tiêu của việc phân loại là đạt được độ chính xác (hay thuần khiết) tối đa tại mỗi nút lá của cây. Có hai phương pháp thống kê thường được dùng để đánh giá thuộc tính:

:::info Các phương pháp đánh giá thuộc tính
- Độ lợi thông tin.
- Chỉ số không thuần khiết Gini.
:::

### 2.1. Độ lợi thông tin

Độ lợi thông tin là một đại lượng đo hiệu quả phân loại các điểm dữ liệu của một thuộc tính. Độ lợi thông tin càng cao thì thuộc tính đó càng phù hợp để chia. Ta định nghĩa đại lượng entropy mô tả sự không thuần khiết của một nút. Gọi $S$ là tập chứa các điểm dữ liệu, $p_i$ là xác suất xuất hiện của điểm dữ liệu thuộc lớp thứ $i$ trong tập $S$, $1 \leq i \leq c$ trong đó $c$ là số lượng các lớp. **Đại lượng entropy của $S$** được tính theo công thức [2.1](#eq2.1):

<Equation 
equation="
H_{S} = E(-log_{2}[P(X)]) = -\sum_{i=1}^{c}{p_{i}log_{2}{p_{i}}}
"
eqId="2.1"
/>

trong đó:

- $H_{S}$ là entropy của tập $S$, khi tập $S$ đang được xét.
- $-log_{2}{p_{i}}$ là số lượng bit tối thiểu để biểu diễn lớp thứ $i$.

Ví dụ, xác suất xuất hiện của lớp $i$ là $1/8$, thì cần $-log_{2}{1/8}=3$ bits để biểu diễn lớp $i$. Như vậy, dễ hiểu $H_{S}$ là trung bình của số lượng bit tối thiểu của các lớp $i$ trong $S$.

Từ phương trình [2.1](#eq2.1), ta thấy rằng entropy bằng 0 nếu tất cả các điểm cùng thuộc một lớp (thuần khiết tối đa) và bằng 1 nếu $p_{1}=p_{2}=...=p_{c}$. Mặt khác, entropy thỏa tính chất đa giai đoạn (multistage): giả sử tập $S$ có ba lớp $p$, $q$, $r$, và $T$ là tập con chứa toàn bộ phần tử thuộc lớp $t=q \vee r$. Ta có phương trình [2.2](#eq2.2):

<Equation 
equation="
H_{S} = H_{p,q,r|S} = H_{p,t|S} + \frac{|T|}{|S|}H_{q,r|T}
"
eqId="2.2"
/>

trong đó $|T|$ và $|S|$ lần lượt là số điểm dữ liệu trong tập $T$ và $S$.

Chứng minh:

$$
H_{p,q,r|S} = -(p_{p}log(p_{p}) + p_{q}log(p_{q}) + p_{r}log(p_{r}))
$$

$$
= -(p_{p}log(p_{p}) + p_{q}log(p_{q}) + p_{r}log(p_{r}) + p_{t}log(p_{t}) + p_{t}log(\frac{1}{p_{t}}))
$$

$$
= -((p_{p}log(p_{p}) + p_{t}log(p_{t})) + (p_{q}log(p_{q}) + p_{q}log(\frac{1}{p_{t}}) + p_{r}log(p_{r}) + p_{r}log(\frac{1}{p_{t}})))
$$

$$
= -((p_{p}log(p_{p}) + p_{t}log(p_{t})) + (p_{q}log(\frac{p_{q}}{p_{t}}) + p_{r}log(\frac{p_{r}}{p_{t}})))
$$

$$
= -((p_{p}log(p_{p}) + p_{t}log(p_{t})) + (p_{q}log(p_{q|T}) + p_{r}log(p_{r|T})))
$$

$$
= -((p_{p}log(p_{p}) + p_{t}log(p_{t})) + p_{t}(p_{q|T}log(p_{q|T})  + p_{r|T}log(p_{r|T})))
$$

$$
= H_{p,t|S} + \frac{|T|}{|S|}H_{q,r|T}
$$

**Độ lợi thông tin $Gain(S, A)$** của thuộc tính $A$ trong $S$ được tính theo công thức [2.3](#eq2.3):

<Equation 
equation="
Gain_{S, A}=H_{S}-\sum_{v\in Values(A)}{\frac{|S_v|}{|S|}H_{S_v}}
"
eqId="2.3"
/>


trong đó $Values(A)$ là tập các giá trị có thể có của thuộc tính $A$, $S_v$ là tập con mà tại đó giá trị của thuộc tính $A$ bằng $v$. Trong phương trình [2.3](#eq2.3), $\sum_{v\in Values(A)}{\frac{|S_v|}{|S|}H_{S_v}}$ là entropy trung bình của $S_v$ được tính với trọng số $\frac{|S_v|}{|S|}$, nghĩa là lượng thông tin mà thuộc tính $A$ đóng góp trong $S$. Như vậy $Gain_{S, A}$ là lượng thông tin mà $S$ có được sau khi bỏ đi lượng thông tin đã mất khi phân loại theo thuộc tính $A$. Lượng thông tin $Gain_{S, A}$ càng lớn chứng tỏ thuộc tính $A$ càng phù hợp để chia.

Xét ví dụ, giả sử "Gió" là một thuộc tính trong tập $S$, mang hai giá trị là "Nhẹ" và "Mạnh". S gồm 14 điểm, trong đó 9 điểm thuộc lớp "Có" và 4 điểm thuộc lớp "Không". Phân bố các điểm của các lớp ứng với thuộc tính "Gió" như sau:
Trong số 9 điểm thuộc lớp "Có", có 6 điểm có "Gió"="Nhẹ", và trong 4 điểm thuộc lớp "Không", có 2 điểm có "Gió"="Nhẹ":

| Gió  | Lớp   | Số điểm |
| ---- | ----- | ------- |
| Nhẹ  | Có    | 6       |
| Nhẹ  | Không | 2       |
| Mạnh | Có    | 3       |
| Mạnh | Không | 2       |

Độ lợi thông tin của tập $S$ khi xét thuộc tính "Gió" được tính như sau:

$$
Gain_{S, \text{Gió}} = H_{S}-\sum_{v\in (\text{Nhẹ}, \text{Mạnh})}{\frac{|S_v|}{|S|} H_{S_v}}
$$

$$
= H_{S}-\frac{|S_{\text{Nhẹ}}|}{|S|}H_{S_{\text{Nhẹ}}}-\frac{|S_{\text{Mạnh}}|}{|S|}H_{S_{\text{Mạnh}}}
$$

Tính $H_{S_{\text{Nhẹ}}}$ and $H_{S_{\text{Mạnh}}}$:

$$
H_{S_{\text{Nhẹ}}}=-\sum_{i=1}^{c}{p_{i}log_{2}{p_{i}}}=-(6/8)log_{2}(6/8)-(2/8)log_{2}(2/8)=0.811
$$

$$
H_{S_{\text{Mạnh}}}=-\sum_{i=1}^{c}{p_{i}log_{2}{p_{i}}}=-(3/6)log_{2}(3/6)-(3/6)log_{2}(3/6)=1
$$

Như vậy: $Gain_{S, \text{Gió}}=0.94-(8/14) \times 0.811-(6/14) \times 1 = 0.048$

### 2.2. Chỉ số không thuần khiết Gini

Chỉ số không thuần khiết Gini là một đại lượng dựa trên mức độ không thuần khiết, dùng để tính mức độ phân tán giữa các phân bố thống kê của các thuộc tính của đối tượng. Nói cách khác, chỉ số Gini tính toán xác suất một mẫu ngẫu nhiên trong một tập **được phân loại sai**, trong trường hợp việc phân loại là ngẫu nhiên dựa vào phân bố của các lớp trong tập đó, nghĩa là xác suất phân loại đúng của một lớp bằng với xác suất xuất hiện của lớp đó trong tập. Chỉ số không thuần khiết Gini được mô tả bởi công thức [2.4](#eq2.4):

<Equation 
equation="
Gini = \sum_{i=1}^{c}{(p_{i}\sum_{k\neq i}{p_{k}})}=\sum_{i=1}^{c}{p_{i}(1-p_{i})}=\sum_{i=1}^{c}{p_{i}}-\sum_{i=1}^{c}{(p_{i})^2}= 1 - \sum^{c}_{i=1}{(p_i)^2}
"
eqId="2.4"
/>


Xét lại ví dụ đã nêu ở phần [Độ lợi thông tin](#21-độ-lợi-thông-tin), ta có:

$$
Gini_{S, \text{Gió}=\text{Nhẹ}}=1-\sum^{2}_{i=1}{(p_i)^2}=1-(6/8)^2-(2/8)^2=0.375
$$

$$
Gini_{S, \text{Gió}=\text{Mạnh}}=1-\sum^{2}_{i=1}{(p_i)^2}=1-(3/5)^2-(2/5)^2=0.480
$$

Chỉ số không thuần khiết Gini cho thuộc tính "Gió" là:

$$
Gini_{S, \text{Gió}}=\frac{6+2}{14}\times0.375+\frac{3+2}{14}\times0.480=0.386
$$

$Gini_{S, \text{Gió}=\text{Nhẹ}}$ là xác suất phân loại sai một mẫu có "Gió"="Nhẹ", tương tự với $Gini_{S, \text{Gió}=\text{Mạnh}}$. Như vậy, $Gini_{S, \text{Gió}}$ là xác suất phân loại sai một mẫu khi thuộc tính "Gió" đang được xét. Do đó nếu chỉ số không thuần khiết Gini của một tập khi xét thuộc tính $A$ là thấp nhất trong số tất cả các thuộc tính được xét, thì thuộc tính $A$ là phù hợp nhất để phân chia tập đó.

## 3. Xây dựng cây quyết định:

Một thuật toán được sử dụng để xây dựng cây quyết định là thuật toán đệ quy Hunt, được xem là thuật toán nền tảng cho những thuật toán tạo cây sau này như ID3, C4.5 hay CART. Thuật toán Hunt là một phương pháp tiếp cận từ dưới lên (bottom-up), trong đó cây quyết định được tạo bằng việc phân chia tập huấn luyện thành nhiều tập con có độ thuần khiết cao hơn. 

Gọi $S_t$ là tập huấn luyện cho nút $t$ và $y={y_1, y_2, ..., y_c}$ là nhãn của các lớp, cây quyết định sẽ được tạp theo trình tự sau:

- Bước 1: Nếu tất cả các phần tử trong $S_t$ cùng thuộc một lớp thì $t$ được xem là một nút lá.
- Bước 2: Nếu $S_t$ chứa các phần tử không thuần khiết (thuộc nhiều lớp khác nhau), tập $S_t$ sẽ được chia theo một thuộc tính thành các tập con, mỗi tập con là một nút con. Thuật toán sẽ được lặp lại cho từng nút con được sinh ra.

Việc chia một nút tùy thuộc vào thuộc tính đó là một trong bốn loại thuộc tính sau đây:

- Thuộc tính nhị phân: thuộc tính chỉ có hai giá trị dạng Có/Không. Trường hợp này chỉ cần chia nút thành hai nhánh ứng với hai giá trị của thuộc tính.
- Thuộc tính định danh: thuộc tính có nhiều giá trị, và có thể được chia theo từng giá trị - chia đa hướng hoặc chia nhị phân (Hình [3.1](#fig3.1)). Với cách chia đa hướng, số lượng hướng bằng với số lượng giá trị duy nhất của thuộc tính. Với cách chia nhị phân, có tổng cộng $2^{k-1}-1$ cách chia khác nhau từ $k$ giá trị của thuộc tính đó.
- Thuộc tính có thứ tự: thuộc tính có thứ tự có thể được chia theo đa hướng hoặc nhị phân giống như thuộc tính định danh, tuy nhiên thứ tự các giá trị không được thay đổi (Hình [3.2](#fig3.2)).
- Thuộc tính liên tục: cần phải rời rạc thuộc tính liên tục trước khi phân chia. Có thể chia thuộc tính liên tục đã rời rạc hóa bằng cách nhị phân theo dạng $(A < \nu)$ và $(A \geq \nu)$, hoặc theo đa hướng theo dạng $\nu_{i} \leq A \leq \nu_{i+1},i=1,...,k$, thứ tự các giá trị không được thay đổi (Hình [3.3](#fig3.3)).

<Figure caption="Các cách chia cho thuộc tính định danh: (a) Chia đa hướng (b) Chia nhị phân" src="/img/decision-tree/split-method-category-feature.png" figId="3.1"/>

<Figure caption="Chia nhị phân cho thuộc tính có thứ tự" src="/img/decision-tree/binary-split-ordered-feature.png" figId="3.2"/>

<Figure caption="Các cách chia cho thuộc tính liên tục: (a) Chia nhị phân (b) Chia đa hướng" src="/img/decision-tree/split-method-continuous-feature.png" figId="3.3"/>

Đối với những thuộc tính có nhiều giá trị, dễ thấy rằng việc chia đa hướng có độ thuần khiết cao hơn việc chia nhị phân. Trong trường hợp chia nhị phân, tính chất [2.2](#eq2.2) chỉ ra rằng các tập con có Entropy nhỏ hơn, như vậy vẫn có thể xác định một luật phân loại sau một vài bước, và phép chia có độ thuần khiết cao nhất trong số tất cả các khả năng chia sẽ được lựa chọn.

Đối với những thuộc tính liên tục, có hai phương pháp sau để rời rạc hóa:

- Khoảng đều nhau: số lượng các khoảng sẽ được chọn trước, từ đó thuộc tính sẽ được chia thành các khoảng đều nhau (hiệu giữa biên trên và biên dưới của mỗi khoảng bằng nhau).
- Phân vị: số lượng các khoảng sẽ được chọn trước, thuộc tính sẽ được chia thành các khoảng sao cho số lượng phần tử trong mỗi khoảng bằng nhau.

## 4. Điều kiện dừng

Việc liên tục phân chia các nút cho đến khi đạt độ thuần khiết cao nhất sẽ tạo ra một mô hình phân loại rất chính xác các mẫu trong tập huấn luyện, khi đó Entropy hoặc chỉ số Gini tại các nút lá bằng 0, tuy nhiên, cấu trúc của cây sẽ rất phức tạp, mất tổng quát và bị trường hợp quá khớp với dữ liệu (overfitting). Như vậy, khi đang xét một nút, việc cần thiết là phải đề ra những ràng buộc để quyết định có nên phân chia tiếp nút đó hay không.

Một số luật giới hạn như sau:

- Số lượng phần tử trong một nút nhỏ hơn một ngưỡng cho trước.
- Khoảng cách từ nút rễ đến nút đó không vượt quá độ sâu giới hạn của cây
- Tổng số nút lá không vượt quá giới hạn cho phép.
- Sự thay đổi của entropy hoặc chỉ số Gini nhỏ hơn một ngưỡng.

Một phương pháp khác được gọi là tỉa cây (pruning). Phương pháp này cho phép cây được quá khớp dữ liệu, sau đó sẽ "tỉa" bớt một số nhánh. Một phương pháp để tỉa là **Reduced error pruning**: 
- Tập huấn luyện ban đầu sẽ được chia thành tập huấn luyện và tập thẩm định (validation set). 
- Cây Quyết định sẽ được xây dựng dựa trên tập huấn luyện cho tới khi đạt độ chính xác tối đa. 
- Tiếp theo, quá trình tỉa được tiến hành: đi ngược từ nút lá lên nút rễ, tỉa các nút chung mức và chung nút cha với nút đó nếu độ chính xác trên tập thẩm định được cải thiện. Quá trình này được dừng lại khi độ chính xác trên tập thẩm định không cải thiện nữa.

Tất cả các ràng buộc này có thể dẫn đến việc nút lá có các phần tử thuộc nhiều hơn một lớp, có nghĩa là sẽ có một số điểm bị phân loại sai. Tuy nhiên, việc giảm độ chính xác này nằm trong khoảng chấp nhận được, và giúp cây đáp ứng tốt với những điểm dữ liệu mới.
