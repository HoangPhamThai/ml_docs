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

Mô hình SVM sử dụng 2 siêu phẳng song song nhau để hiện thực 2 điều kiện trong phần [1](#1-ý-tưởng). Hai siêu phẳng này phân chia các điểm dữ liệu theo lớp và cách xa nhau nhất có thể. Trong Hình [2.1](#fig2.1), các classifier đều 2 có hai siêu phẳng phân chia các điểm dữ liệu, nhưng classifier 2 có khoảng cách giữa các siêu phẳng xa nhất. Có thể thấy, với các classifier, trong miền giữa hai siêu phẳng không có điểm dữ liệu nào, đây được gọi là <EmphasisText content='Hard margin classification'/>

<Figure caption="Hai siêu phẳng thoả điều kiện phân chia và tối đa khoảng cách để xây dựng mô hình SVM" src="/img/svm/twofold-svm.png" figId="2.1"/>

Cũng dễ thấy rằng việc có thêm những điểm dữ liệu nằm ngoài các margin này cũng không thay đổi các margin, do các margin được xác định bởi các điểm dữ liệu nằm trên đường biên, những điểm này gọi là <EmphasisText content='Support vectors'/>.

Tuy nhiên, hard margin classification có hai nhược điểm sau:

- Chỉ phù hợp với những dữ liệu có đường biên tuyến tính rõ ràng.
- Rất nhạy với outliers.

<Figure caption="Hard margin (các đường line liên tục) và soft margin (các đường line nét đứt)" src="/img/svm/hard-soft-margin.png" figId="2.2"/>

Một ví dụ về những nhược điểm của hard margin được thể hiện ở Hình [2.2](#fig2.2). Với một điểm outlier (Hình trái), hard margin (đường nét liền) có khoảng cách rất nhỏ, và khả năng cao bị _overfitting_. Hoặc với các điểm dữ liệu có phân bố không tuyến tính (Hình phải), không thể tồn tại một hard margin classification để phân chia các điểm dữ liệu. Tuy nhiên, nếu chấp nhận một số điểm dữ liệu bị phân loại sai, vẫn đảm bảo tối đa hoá khoảng cách giữa các siêu phẳng, ta được một mô hình có khả năng phân loại tốt, đảm bảo tính tổng quát của mô hình và không bị ảnh hưởng nhiều bởi các điểm outliers, đây gọi là <EmphasisText content='Soft margin classification'/> (đường nét đứt trong Hình [2.2](#fig2.2)).

### Linear SVM

