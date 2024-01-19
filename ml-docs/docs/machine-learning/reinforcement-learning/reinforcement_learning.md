import Figure from '/src/components/Figure/figure.jsx'
import Equation from '/src/components/Equation/equation.jsx'

# Giới thiệu

Học tăng cường (Reinforcement Learning) là một loại học máy giúp huấn luyện tác tử (agent) trong môi trường tương tác bằng phương pháp **thử và sai**. Tác tử tương tác với môi trường, nhận phản hồi và điều chỉnh tương tác trong lần tới.

So sánh mục đích của học có giám sát, học không giám sát và học tăng cường:

| Học có giám sát                      | Học không giám sát                            | Học tăng cường                                             |
| ------------------------------------ | --------------------------------------------- | ---------------------------------------------------------- |
| Dự đoán giá trị tiếp theo, phân loại | Phát hiện tương quan trong dữ liệu, phân loại | Tìm hành động phù hợp để tối ưu **_phần thưởng_** luỹ tiến |

## 1. Mô hình bài toán Reinforcement learning

<Figure caption="Mô hình bài toán Reinforcement learning" src="/img/reinforcement-learning/general-model.png" figId="1.1"/>

Một bài toán Reinforcement learning được mô tả khái quát ở Hình [1.1](#fig1.1) gồm các thành phần sau:

- **Agent**: đối tượng được huấn luyện trong môi trường.
- **Environment**: môi trường mà agent tương tác.
- **Action**: hành động/sự tương tác của agent với môi trường.
- **Reward**: hồi đáp của môi trường với action của agent.
- **State**: trạng thái của môi trường khi nhận được action của agent.
- **Policy**: chiến lược/phương pháp của agent để đưa ra action tiếp theo dựa trên state hiện tại.

Xét tại thời điểm $t$:
- Agent căn cứ vào state $S_t$ và reward $R_t$ của môi trường và quyết định tương tác bằng action $A_t$.
- Environment hồi đáp lại agent với reward $R_{t+1}$ và thay đổi trạng thái $S_{t+1}$.
- Quá trình trên được lặp lại.

Qua mô hình trên, ta có công thức [1.1](#eq1.1) của reward:

<Equation 
equation="
R_t = \sum_{i=t_0}^{\infty}{r_i}
"
eqId="1.1"
/>

Phương trình [1.1](#eq1.1) chứng tỏ rằng `reward` là một chuỗi vô hạn của các reward thành phần tại các thời điểm khác nhau kể từ thời điểm $t_0$. Chuỗi này không thể hội tụ được, nghĩa là không thể xây dựng được policy hữu hạn để tối ưu được reward, agent sẽ tương tác liên tục không ngừng với môi trường. Như vậy, để [1.1](#eq1.1) hội tụ, tham số ***discount factor*** $\gamma$ được thêm vào, ta có công thức [1.2](#eq1.2):

<Equation 
equation="
R_t = \sum_{i=t_0}^{\infty}{\gamma^{i}r_i}
"
eqId="1.2"
/>

với $\gamma < 1$.

Chứng minh [1.2](#eq1.2) hội tụ:

Reward của môi trường có giới hạn, tức là $\exists r_{max}$, $\forall i, r_i \leq r_{max} < \infty$.
Ta có:
$$
R_t = \sum_{i=t_0}^{\infty}{\gamma^{i}r_i} \leq \sum_{i=t_0}^{\infty}{\gamma^{i}r_{max}} = \frac{r_{max}}{1-\gamma} < \infty
$$

Như vậy $R_t$ hội tụ.