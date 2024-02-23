---
layout: distill
title: PQVCM
description: Journal of Statistical Planning and Inference
img: assets/img/method_1.png
importance: 1
category: methodology
date: 2022-03-01

authors:
  - name: Eun Ryung Lee
    affiliations:
      name: Sungkyunkwan University
  - name: Jinwoo Cho
    affiliations:
      name: University of Pittsburgh
  - name: Seyoung Park
    affiliations:
      name: Sungkyunkwan University
---

## Penalized kernel quantile regression for varying coefficient models

* Propose a method that identifies the partially linear structure of the varying coefficient model.
* Develop an efficient algorithm using the proximal alternating direction method of multipliers with a convergence guarantee.
* Derive the novel plug-in bandwidth selection using high-diemnsional kernel theory.



### Model configuration

#### 1. Varying Coefficient quantile model 

Given any quantile level $$\tau$$ $$(0 < \tau < 1)$$, consider the $$\tau$$-th varying coefficient quantile regression

$$
Y = \sum^p_{j=1}g_{j, \tau}(U)X^{(j)} + \varepsilon,
$$

where $$U \in [0,1]$$ is an index variable, $$g_\tau = (g_{1,\tau(u)}, \ldots, g_{p,\tau(u)})^\top$$ is a vector of coefficient functions, and the conditional $$\tau$$-th quantile of a random error $$\varepsilon$$ given $$(U, \{X^{(j)}\}_{1\le j \le p})$$ is zero.

#### 2. Proposed method 

Suppose that the underlying coefficient functions $$g_k(u)$$, $$k=1,\ldots, p$$, are smooth. Then, the smooth function $$g_k(\cdot)$$ can be approximated in a locally linear manner, i.e., $$g_k(U) \approx g_k(u) + g'_k(u)(U-u)$$ for any $$U$$ close to $$u$$. That is, given $$0 \le u \le 1,$$ estimate $$g_k(u)$$ and $$g_k'(u)$$; by minimizing

$$
\sum^n_{i=1}\rho_\tau\left(Y_i - \sum^p_{k=0}X_i^{(k)}(a_k + b_k(U_i - u))\right)K_h(u - U_i),
$$

with respect to $$a_k, b_k \in \mathbb{R}$$, where $$\rho_\tau(t) = t(\tau - I(t \le 0))$$ is the check loss function. As a result, we can consider the following loss function for all $$u$$ by integrating such that 

$$
Q({\bf a}, {\bf b}) = \frac{1}{n}\int^1_0 \sum^n_{i=1}\rho_\tau\left(Y_i - \sum^p_{k=0}X_i^{(k)}(a_k + b_k(U_i - u))\right)\times K_h(u - U_i)du.
$$

Furthermore, using the following penalized criterion

$$
Q({\bf a}, {\bf b}) + \sum^p_{j=1}w_j\sqrt{\|a_j\|^2 + h^2\|b_j\|^2} + \sum^p_{j=1}v_j\sqrt{\|a_j\|^2_c + h^2\|b_j\|^2}
$$

$$
\text{subject to } \|a_j\|_\infty \vee \|hb_j\|_\infty \le M_1, \sqrt{\|a_j^{(2)}\|^2 + \|hb_j^{(2)}\|^2} \le M_2
$$

for all $$j=1,\ldots,p$$ for some positive constant $$M_1$$ and $$M_2$$.
