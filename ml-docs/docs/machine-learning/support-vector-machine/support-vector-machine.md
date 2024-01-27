import Figure from '/src/components/Figure/figure.jsx'
import Equation from '/src/components/Equation/equation.jsx'
import {EmphasisText} from '/src/components/Text/text.jsx'

# Support Vector Machine

Support Vector Machine (SVM) là một mô hình học có giám sát, được dùng cho các bài toán phân loại và hồi quy. Đây là một trong những mô hình thông dụng nhất của học máy, do khả năng phân loại tốt trên những tập dữ liệu tuyến tính và không tuyến tính.

## 1. Ý tưởng

Việc dùng một siêu phẳng để phân loại các điểm dữ liệu là một điều rất phổ biến trong các mô hình học máy, nhưng nó đặt ra một câu hỏi: **_Siêu phẳng nào là tốt nhất?_**

<Figure caption="Các trường hợp của siêu phẳng để phân loại dữ liệu" src="/img/svm/multiple-posible-hyperplanes.png" figId="1.1"/>

Dựa vào Hình [1.1](#fig1.1), có thể thấy có vô số siêu phẳng thoả mãn phân chia các điểm dữ liệu. Tuy nhiên, classifier 1 và 3 nằm rất sát với các điểm dữ liệu, như vậy, chỉ một thay đổi nhỏ của dữ liệu cũng dẫn đến có một vài điểm thuộc lớp này vượt qua siêu phẳng để vào miền của lớp khác, dẫn đến mô hình phân loại sai. Trong khi đó, classifier 2 nằm rất xa với các điểm dữ liệu, nên ít bị ảnh hưởng bởi những thay đổi nhỏ của dữ liệu, mô hình có khả năng phân loại tốt hơn.

Vậy nên, ý tưởng của SVM là tìm một siêu phẳng thoả hai điều kiện:

**(1) Phân chia các điểm thuộc 2 lớp.**

**(2) Tối đa khoảng cách giữa các điểm trong tập dữ liệu với siêu phẳng đó.**

## 2. Xây dựng mô hình

Mô hình SVM sử dụng 2 siêu phẳng song song nhau để hiện thực 2 điều kiện trong phần [1](#1-ý-tưởng). Hai siêu phẳng này phân chia các điểm dữ liệu theo lớp và cách xa nhau nhất có thể. Trong Hình [2.1](#fig2.1), các classifier đều 2 có hai siêu phẳng phân chia các điểm dữ liệu, nhưng classifier 2 có khoảng cách giữa các siêu phẳng xa nhất. Có thể thấy, với các classifier, trong miền giữa hai siêu phẳng không có điểm dữ liệu nào, đây được gọi là <EmphasisText content='Hard margin classification'/>.

<Figure caption="Hai siêu phẳng thoả điều kiện phân chia và tối đa khoảng cách để xây dựng mô hình SVM" src="/img/svm/twofold-svm.png" figId="2.1"/>

Cũng dễ thấy rằng việc có thêm những điểm dữ liệu nằm ngoài các margin này cũng không thay đổi các margin, do các margin được xác định bởi các điểm dữ liệu nằm trên đường biên, những điểm này gọi là <EmphasisText content='Support vectors'/>.

Tuy nhiên, hard margin classification có hai nhược điểm sau:

- Chỉ phù hợp với những dữ liệu có đường biên tuyến tính rõ ràng.
- Rất nhạy với outliers.

<Figure caption="Hard margin (các đường line liên tục) và soft margin (các đường line nét đứt)" src="/img/svm/hard-soft-margin.png" figId="2.2"/>

Một ví dụ về những nhược điểm của hard margin được thể hiện ở Hình [2.2](#fig2.2). Với một điểm outlier (Hình trái), hard margin (đường nét liền) có khoảng cách rất nhỏ, và khả năng cao bị _overfitting_. Hoặc với các điểm dữ liệu có phân bố không tuyến tính (Hình phải), không thể tồn tại một hard margin classification để phân chia các điểm dữ liệu. Tuy nhiên, nếu chấp nhận một số điểm dữ liệu bị phân loại sai, vẫn đảm bảo tối đa hoá khoảng cách giữa các siêu phẳng, ta được một mô hình có khả năng phân loại tốt, đảm bảo tính tổng quát của mô hình và không bị ảnh hưởng nhiều bởi các điểm outliers, đây gọi là <EmphasisText content='Soft margin classification'/> (đường nét đứt trong Hình [2.2](#fig2.2)).

### 2.1. Linear SVM

#### 2.1.1. Hard margin classification

Mô tả bài toán: cho các điểm dữ liệu thuộc hai lớp khác nhau và có thể được chia bằng một siêu phẳng tuyến tính. Tìm siêu phẳng đó thoả [hai điều kiện](#1-ý-tưởng) của SVM.

Ta có các định nghĩa sau:

Siêu phẳng cần tìm công thức [2.1](#eq2.1):

<Equation 
equation="
\bm{w}^{T}\bm{x} + b = 0
"
eqId="2.1"
/>

Khoảng cách từ vector $x$ đến siêu phẳng [2.1](#eq2.1) được xác định bởi công thức [2.2](#eq2.2):

<Equation 
equation="
z = \frac{|\bm{w}^{T}\bm{x} + b|}{||\bm{w}||_2}
"
eqId="2.2"
/>

Gọi hai lớp đã cho là -1 và +1, gọi $y_i$ là chỉ số phân lớp của điểm $x_i$ với $i=0,1,...,N-1$, $N$ là tổng số điểm dữ liệu. Không mất tính tổng quát, $y_i=1$ khi $x_i$ thuộc lớp +1, $y_i=-1$ khi $x_i$ thuộc lớp -1, nghĩa là lớp +1 nằm về phía dương của siêu phẳng và lớp -1 nằm về phía âm của siêu phẳng.

Như vậy, khoảng cách từ một điểm $x_i$ đến siêu phẳng là:

<Equation 
equation="
z_i = \frac{y_i ( \bm{w}^{T}\bm{x} + b )}{||\bm{w}||_2}
"
eqId="2.3"
/>

Công thức [2.3](#eq2.3) đảm bảo $z_i$ luôn không âm do $y_i$ và $\bm{w}^{T}\bm{x} + b$ cùng dấu (theo định nghĩa của $y_i$), có thể xem đây là một cách viết khác của công thức [2.2](#eq2.2).

Gọi $margin$ là khoảng cách gần nhất từ một điểm $x_i$ đến siêu phẳng, tức là:

<Equation 
equation="
margin = \min_{i} \frac{y_i ( \bm{w}^{T}\bm{x} + b )}{||\bm{w}||_2}
"
eqId="2.4"
/>

Như vậy, bài toán tối ưu là tìm $\bm{w}$ và $b$ để $margin$ lớn nhất:

<Equation 
equation="
(\bm{w}, b) = arg\max_{\bm{w},b} \biggl\{ \min_{i} \frac{y_i (\bm{w}^{T}\bm{x}_i + b)}{||\bm{w}||_2} \biggl\} 
= arg\max_{\bm{w},b} \biggl\{ \frac{1}{||\bm{w}||_2} \min_{i} y_i (\bm{w}^{T}\bm{x}_i + b) \biggl\}
"
eqId="2.5"
/>

Giả sử tìm được $\bm{w_1}, b_1$ thoả bài toán tối ưu, ta thấy rằng:

<Equation 
equation="
\bm{w_1}^{T}x + b_1 = k(\bm{w_2}^{T}x + b_2)
"
eqId="2.6"
/>

với $\bm{w_1}=k\bm{w_2}$ và $b_1=kb_2$, $k>0$, thì siêu phẳng không đổi, tức là $margin$ không đổi. Như vậy, ta có thể giả sử:

<Equation 
equation="
y_i (\bm{w}^{T}\bm{x}_i + b) = 1
"
eqId="2.7"
/>

**_với những điểm nằm sát mặt phân chia_**. Gọi tập hợp những điểm này là $\mathbf{S}$. Điều này có nghĩa là:

- $\min_{i} y_i (\bm{w}^{T}\bm{x}_i + b) = 1$. Dấu "=" xảy ra khi $\bm{x_i} \in \mathbf{S}$.

- $$\bm{x_i} \notin \mathbf{S}$$, tức là $\bm{x_i}$ nằm cách xa đường margin, khi đó $y_i (\bm{w}^{T}\bm{x}_i + b) > 1$.

<Figure caption="Minh hoạ phương trình của siêu phẳng đi qua tập S" src="/img/svm/hard-margin-3-lines.png" figId="2.3"/>

Minh hoạ cho phương trình [2.7](#eq2.7) được thể hiện ở Hình [2.3](#fig2.3). Các điểm nằm sát đường phân chia đều thoả phương trình [2.7](#eq2.7), lúc đó siêu phẳng cần tìm nằm ở giữa hai đường biên. Dễ thấy rằng, hai đường biên này quyết định siêu phẳng cần tìm, đây cũng là ý nghĩa của **_Support vectors_**.

Như vậy ta có:

<Equation 
equation="
y_i (\bm{w}^{T}\bm{x}_i + b) \geq 1, \forall i=0,1,...,N-1
"
eqId="2.8"
/>

Từ [2.8](#eq2.8) và [2.5](#eq2.5), bài toán trở thành:

<Equation 
equation="
(\bm{w}, b) = arg\max_{\bm{w},b} \frac{1}{||\bm{w}||_2}
"
eqId="2.9"
/>

$$
s.t.: y_i (\bm{w}^{T}\bm{x}_i + b) \geq 1, \forall i=0,1,...,N-1
$$

Ta có:

$$
\bm{w} = arg\max_{\bm{w}}\frac{1}{||\bm{w}||_2} = arg\min_{\bm{w}}||\bm{w}||_2 = arg\min_{\bm{w}}||\bm{w}||^2_2
$$

với $||\bm{w}||_2 \geq 0$. Như vậy [2.9](#eq2.9) trở thành:

<Equation 
equation="
(\bm{w}, b) = arg\min_{\bm{w},b} \frac{1}{2}||\bm{w}||^2_2
"
eqId="2.10"
/>

$$
s.t.: 1-y_i (\bm{w}^{T}\bm{x}_i + b) \leq 0, \forall i=0,1,...,N-1
$$

Lúc này hàm mục tiêu là một hàm khả vi và số $\frac{1}{2}$ được thêm làm biểu thức đạo hàm đẹp hơn.

Hàm Lagrange:

<Equation 
equation="
\mathcal{L}(\bm{w},b,\bm{\lambda}) = \frac{1}{2}||\bm{w}||_2 + \sum_{i=0}^{N-1}\lambda_{i}(1-y_i (\bm{w}^{T}\bm{x}_i + b))
"
eqId="2.11"
/>

với $\bm{\lambda}=[\lambda_{0}, \lambda_{1}, ..., \lambda_{N-1}]^{T}$, $\lambda_i \geq 0$ $\forall i=0,1,...,N-1$.

Tính các đạo hàm riêng:

<Equation 
equation="
\nabla_{\bm{w}} \mathcal{L}(\bm{w},b,\bm{\lambda}) = \bm{w} - \sum_{i=0}^{N-1}\lambda_{i} y_i \bm{x}_i = 0 \Rightarrow \bm{w} = \sum_{i=0}^{N-1}\lambda_{i} y_i \bm{x}_i
"
eqId="2.12"
/>

<Equation 
equation="
\nabla_{b} \mathcal{L}(\bm{w},b,\bm{\lambda}) = - \sum_{i=0}^{N-1}\lambda_{i} y_i = 0
"
eqId="2.13"
/>

Thay các đạo hàm riêng vào [2.11](#eq.2.11), ta có:

$$
\mathcal{L}(\bm{w},b,\bm{\lambda}) = \frac{1}{2}||\bm{w}||_2 + \sum_{i=0}^{N-1}\lambda_{i}(1-y_i (\bm{w}^{T}\bm{x}_i + b))
$$

$$
= \frac{1}{2}||\bm{w}||_2 + \sum_{i=0}^{N-1}\lambda_{i} - \sum_{i=0}^{N-1}\lambda_{i}y_i \bm{w}^{T}\bm{x}_i - \sum_{i=0}^{N-1}\lambda_{i}y_i b
$$

$$
= \frac{1}{2}||\bm{w}||_2 + \sum_{i=0}^{N-1}\lambda_{i} - \sum_{i=0}^{N-1}\lambda_{i}y_i \bm{w}^{T}\bm{x}_i
$$

$$
= \sum_{i=0}^{N-1}\lambda_{i} + \frac{1}{2}\bm{w}^{T}\bm{w} - \bm{w}^{T}\bm{w}
$$

$$
= \sum_{i=0}^{N-1}\lambda_{i} - \frac{1}{2}\bm{w}^{T}\bm{w}
$$

<Equation 
equation="
= \sum_{i=0}^{N-1}\lambda_{i} - \sum_{i=0}^{N-1}\sum_{j=0}^{N-1}\lambda_{i}\lambda_{j} y_i y_j \bm{x}^{T}_i  \bm{x}_j
"
eqId="2.14"
/>

Đặt $\mathbf{V} = [y_0 \bm{x}_0,y_1 \bm{x}_1,.., y_N \bm{x}_N]$, $\mathbf{K}=\mathbf{V}^T\mathbf{V}$, $\bm{1}=[1,1,...,1]^{T}$, [2.14](#eq.2.14) được viết lại thành:

<Equation 
equation="
g(\bm{\lambda})= -\frac{1}{2}\bm{\lambda}^T\mathbf{K}\bm{\lambda} + \bm{1}^{T}\bm{\lambda}
"
eqId="2.15"
/>

Bài toán đối ngẫu Lagrange:

<Equation 
equation="
\bm{\lambda} = arg\max_{\bm{\lambda}}g(\bm{\lambda})
"
eqId="2.16"
/>

$$
s.t.: \bm{\lambda}  \succeq 0\\
\sum_{i=0}^{N-1} \lambda_{i}y_i = 0
$$

Thay nghiệm $\bm{\lambda}$ của bài toán [2.16](#eq2.16) vào [2.12](#eq2.12) và [2.13](#eq2.13), ta tìm được siêu phẳng cần tìm.

#### 2.1.2. Soft margin classification

Với bài toán soft margin, ta chấp nhận có một số điểm dữ liệu nằm giữa hai margin. Đặt $\xi_i$ là biến đại diện cho mức độ phân loại sai của điểm dữ liệu thứ i (biến $\xi_i$ được gọi là _slack variable_).

<Figure caption="Biến slack thể hiện mức độ phân loại sai trong bài toán soft margin" src="/img/svm/soft-margin-slack.png" figId="2.4"/>

Ví dụ mô hình soft margin có biến $\xi_i$ được thể hiện ở Hình [2.4](#fig2.4). Miền giá trị của $\xi_i$ được định nghĩa như sau:

- Điểm dữ liệu $\bm{x_i}$ thuộc đúng miền và ở ngoài vùng margin: $\xi_i = 0$.
- $\bm{x_i}$ thuộc đúng miền nhưng ở trong vùng giữa hai margin: $0 < \xi_i < 1$.
- $\bm{x_i}$ nằm sai miền và ở ngoài vùng margin: $\xi_i > 1$.

Hàm mục tiêu của soft margin SVM:

<Equation 
equation="
\frac{1}{2}||\bm{w}||^2_2 + C \sum_{i=0}^{N-1}\xi_i
"
eqId="2.17"
/>

với $C$ là một hằng số dương, đóng vai trò điều chỉnh tầm quan trọng của margin (khoảng cách giữa hai đường biên) và sai số phân loại. Từ công thức [2.17](#eq2.17), ta thấy được ý nghĩa của từng thành phần như sau:

- Số hạng $\frac{1}{2}||\bm{w}||^2_2$: thể hiện <EmphasisText content='độ mất mát khoảng cách'/>. Việc tối thiểu số hạng này sẽ làm tối đa $margin$ như đã nêu ở phương trình [2.5](#eq2.5).

- Số hạng $\sum_{i=0}^{N-1}\xi_i$: thể hiện <EmphasisText content='độ mất mát phân loại'/>. Nếu $\sum_{i=0}^{N-1}\xi_i = 0$, với ràng buộv $\xi_i \geq 0, \forall i=0,1,...,N-1$, thì $\xi_i = 0, \forall i=0,1,...,N-1$. Như vậy không có một điểm dữ liệu nào bị phân loại sai. Bài toán quay về trường hợp [Hard margin](#211-hard-margin-classification).

- Giá trị $C$:

  - Với $C$ nhỏ: tức độ mất mát phân loại không ảnh hưởng nhiều đến giá trị hàm mục tiêu. Như vậy tăng $margin$ sẽ quan trọng hơn, tức là làm 2 đường biên xa nhau hơn. Tuy vậy điều này cũng dẫn đến $\sum_{i=0}^{N-1}\xi_i$ tăng theo.

  - Với $C$ lớn: tức tăng ảnh hưởng của độ mất mát phân loại, mô hình sẽ giảm thiểu các điểm bị phân loại sai hoặc nằm trong vùng giữa hai đường biên, nghĩa là khoảng cách giữa hai đường biên được thu hẹp.

  Những sự thay đổi này được mô hình ở Hình [2.5](#fig2.5).

<Figure caption="Sự thay đổi của C với khoảng cách giữa hai đường biên" src="/img/svm/change-of-c.png" figId="2.5"/>

Ta có ràng buộc tương ứng:

$$
y_i (\bm{w}^{T}\bm{x}_i + b) \geq 1 - \xi_i
$$

<Equation 
equation="
\Leftrightarrow 1 - \xi_i - y_i (\bm{w}^{T}\bm{x}_i + b) \leq 0, \forall i=0,1,...,N-1
"
eqId="2.18"
/>

với ràng buộc phụ $\xi_i \geq 0, \forall i=0,1,...,N-1$.

Ta có bài toán tối ưu sau:

<Equation 
equation="
(\bm{w}, b, \xi) = arg\min_{\bm{w}, b, \xi} \biggl\{ \frac{1}{2} ||\bm{w}||^2_2 + C \sum^{N-1}_{i=0} \xi_i \biggl\}
"
eqId="2.19"
/>

$$
s.t.: 1 - \xi_i - y_i (\bm{w}^{T}\bm{x}_i + b) \leq 0, \forall i=0,1,...,N-1
$$

$$
-\xi_i \leq 0, \forall i=0,1,...,N-1
$$

Bài toán [2.19](#eq2.19) có thể được giải bằng hàm Lagrange và bài toán đối ngẫu Lagrange. Hàm Lagrange của bài toán như sau:

<Equation 
equation="
\mathcal{L}(\bm{w},b,\xi,\bm{\lambda},\bm{\mu}) = \frac{1}{2} ||\bm{w}||^2_2 + C \sum^{N-1}_{i=0} \xi_i + \sum^{N-1}_{i=0}\lambda_i(1-\xi_i-y_i(\bm{w}^T\bm{x}_i + b)) - \sum^{N-1}_{i=0}\mu_i\xi_i
"
eqId="2.20"
/>

với $\bm{\lambda}=[\lambda_0,\lambda_1,...,\lambda_{N-1}]^T \succeq 0$, $\bm{\mu}=[\mu,\mu,...,\mu_{N-1}]^T \succeq 0$ là các nhân tử Lagrange.

Các phương trình đạo hàm riêng:

<Equation 
equation="
\frac{\partial \mathcal{L}}{\partial \bm{w}} = 0 \Leftrightarrow \bm{w}= \sum^{N-1}_{i=0}\lambda_i y_i \bm{x}_i
"
eqId="2.21"
/>

<Equation 
equation="
\frac{\partial \mathcal{L}}{\partial \bm{b}} = 0 \Leftrightarrow \sum^{N-1}_{i=0}\lambda_i y_i = 0 
"
eqId="2.22"
/>

<Equation 
equation="
\frac{\partial \mathcal{L}}{\partial \xi_i} = 0 \Leftrightarrow \lambda_i = C - \mu_i
"
eqId="2.23"
/>

Hàm đối ngẫu Lagrange:

<Equation 
equation="
g(\bm{\lambda}, \bm{\mu}) = \sum^{N-1}_{i=0}\lambda_i - \frac{1}{2}\sum^{i=0}_{N-1}\sum^{j=0}_{N-1}\lambda_i \lambda_j y_i y_j \bm{x}^T_i \bm{x}_j
"
eqId="2.24"
/>

Bài toán đối ngẫu:

<Equation 
equation="
\bm{\lambda} = arg\max_{\bm{\lambda}}g(\bm{\lambda})
"
eqId="2.25"
/>

$$
s.t.: \sum^{N-1}_{i=0}\lambda_i y_i = 0
$$

$$
0 \leq \lambda_i \leq C, \forall i=0,1,...,N-1
$$

Tìm được $\bm{\lambda}$, ta thay vào các phương trình đạo hàm riêng để tìm $\bm{w}$ và $b$.

Bài toán [2.19](#eq2.19) có thể được giải bằng cách đưa về bài toán tối ưu không ràng buộc.

Từ phương trình [2.18](#eq2.18), ta có:

<Equation 
equation="
\xi_i \geq 1 - y_i (\bm{w}^{T}\bm{x}_i + b)
"
eqId="2.20"
/>

mặt khác $\xi_i \geq 0$. Như vậy:

$$
\xi_i \geq max(0,1 - y_i (\bm{w}^{T}\bm{x}_i + b))
$$

Bài toán tối ưu được viết lại như sau:

<Equation 
equation="
(\bm{w}, b, \xi) = arg\min_{\bm{w}, b, \xi} \biggl\{ \frac{1}{2} ||\bm{w}||^2_2 + C \sum^{N-1}_{i=0} \xi_i \biggl\}
"
eqId="2.21"
/>

$$
s.t.: \xi_i \geq max(0,1 - y_i (\bm{w}^{T}\bm{x}_i + b))
$$

### 2.2. Non-linear classification

Các bài toán được nêu ở trên đều tìm một siêu phẳng để phân chia các điểm dữ liệu, vậy với những dữ liệu không phân biệt tuyến tính (Hình [2.6](#fig2.6)), ta phải ứng dụng kỹ thuật Kernel.

<Figure caption="Dữ liệu không phân biệt tuyến tính ở không gian 2D nhưng phân biệt tuyến tính khi đưa lên không gian 3D bằng kernel" src="/img/svm/kernel-svm.png" figId="2.6"/>

Kỹ thuật Kernel là tìm một hàm số biến các điểm dữ liệu trong không gian ban đầu thành dữ liệu trong không gian mới bằng hàm kernel $\Phi(\bm{x})$, trong không gian mới đó, các điểm dữ liệu phân biệt tuyến tính, khi đó bài toán được đưa về bài toán tuyến tính.

Một số kernel thông dụng:

- **Linear**:

$$
k(\bm{x}, \bm{z}) = \bm{x}^T \bm{z}
$$

- **Polynomial**:

<Equation 
equation="
k(\bm{x}, \bm{z}) = (r + \gamma\bm{x}^T \bm{z})^d
"
eqId="2.22"
/>

với $d$ là số dương chỉ bậc của đa thức.

<Figure caption="Áp dụng kernel đa thức để biến dữ liệu thành phân biệt tuyến tính" src="/img/svm/polynomial-kernel.png" figId="2.7"/>

Hình [2.7](#fig2.7) là một ví dụ về cách kernel đa thức biến đổi dữ liệu thành phân biệt tuyến tính. Nếu nhìn trong không gian 2D, ta thấy không tồn tại một đường thẳng để phân tách các điểm dữ liệu, tuy nhiên, nếu dùng đa thức:

$$
z = x^2_1 + x^2_2
$$

khi đó các điểm dữ liệu có thể được phân tách tuyến tính bằng một mặt phẳng, tương ứng với một đường tròn trong không gian 2D.

Xét về mặt toán học, với không gian gốc n-chiều, khi áp dụng kernel đa thức thì số chiều được nâng lên thành $n + \frac{n(n+1)}{2}$. Xét ví dụ trong không gian 2D, với 2 điểm $\bm{x}$, $\bm{z}$, áp dụng kernel đa thức:

$$
k(\bm{x}, \bm{z}) = (1 + \bm{x}^T \bm{z})^2 = (1 + x_0z_0 + x_1z_1)^2
$$

$$
= 1 + 2x_0z_0 + 2x_1z_1 + x^2_0 z^2_0 + 2x_0z_0x_1z_1 + x^2_1z^2_1
$$

$$
=(1, \sqrt{2}x_0, \sqrt{2}x_1, x^2_0, \sqrt{2}x_0x_1, x^2_1)(1, \sqrt{2}z_0, \sqrt{2}z_1, z^2_0, \sqrt{2}z_0z_1, z^2_1)
$$

$$
=\Phi(\bm{x})^T\Phi(\bm{z})
$$

Số chiều từ 2D được nâng lên 6D, nhưng thực tế tính toán, ta chỉ tính 5 chiều (bỏ số 1). Như vậy, một điểm $\bm{x} = [x_0, x_1]$ được nâng lên thành $\bm{x'} = [x_0, x_1, x^2_0, x_0x_1, x^2_1]$. Trong ví dụ ở Hình [2.7](#fig2.7), áp dụng $\Phi(\bm{x})=\sum^{N-1}_{i}x^2_i$, tập dữ liệu được phân biệt tuyến tính trong không gian 5D.

- **Radial Basic Function (RBF)**

<Equation 
equation="
k(\bm{x}, \bm{z}) = exp(-\gamma||\bm{x} - \bm{z}||^2_2), \gamma>0
"
eqId="2.23"
/>

<Figure caption="Tác động của RBF kernel tới điểm dữ liệu" src="/img/svm/rbf-kernel.png" figId="2.8"/>

Ý tưởng của RBF là nâng hoặc hạ từng điểm dữ liệu theo lớp của nó (Hình [2.8](#fig2.8)), nói cách khác, ta tạo "chiều cao" cho các điểm dữ liệu. Như vậy, ta dễ dàng thấy được siêu phẳng phân tách tuyến tính có chiều cao bằng 0. Ví dụ minh hoạ được thể hiện ở Hình [2.9](#fig2.9), các điểm dữ liệu thuộc lớp màu xanh được "nâng lên" còn các điểm lớp màu đỏ được "hạ xuống". Như vậy, ta tìm được một siêu phẳng phân tách trong không gian gốc.

<Figure caption="Phân biệt tuyến tính với RBF kernel " src="/img/svm/rbf-kernel-classification.png" figId="2.9"/>

Xét trường hợp đơn giản nhất của RBF trong không gian 1D tại điểm 0, khi đó phương trình của RBF là:

$$
y = e^{-x^2}
$$

Đồ thị của hàm trên được thể hiện ở Hình [2.10](#fig2.10), ta thấy đồ thị giống với phân phối chuẩn.

<Figure caption="Trường hợp đơn giản của RBF kernel trong không gian 1D" src="/img/svm/plot-rbf-1d.png" figId="2.10"/>

Với không gian n-chiều, ta muốn "nâng" một điểm $\bm{p}=(p_0, p_1, ..., p_{N-1})$, thì RBF có công thức:

$$
y = e^{-[(x_0-p_0)^2 + (x_1-p_1)^2 + ... + (x_{N-1}-p_{N-1})^2]}
$$

Giá trị $\gamma$ trong phương trình [2.23](#eq2.23) chỉ độ rộng của vùng không gian ứng với từng điểm dữ liệu. Trong Hình [2.11](#fig2.11), $\gamma$ càng cao thì độ rộng không gian càng hẹp. Như vậy, với RBF kernel, $\gamma$ là một thông số quan trọng, nếu giá trị quá lớn, mô hình có thể bị overfitting, do các đường biên quá tập trung cho từng điểm dữ liệu; còn nếu giá trị quá nhỏ, mô hình có thể bị underfitting, như được mô tả ở Hình [2.12](#fig.2.12).

<Figure caption="Ảnh hưởng của chỉ số gamma với không gian xung quanh" src="/img/svm/gamma-rbf.png" figId="2.11"/>

<Figure caption="Ảnh hưởng của chỉ số gamma với hiệu quả phân loại của mô hình" src="/img/svm/underfit-overfit-gamma-rbf.png" figId="2.12"/>

## 3. SVM với sklearn

## 4. Tài liệu tham khảo
