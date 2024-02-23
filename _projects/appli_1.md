---
layout: page
title: Disease Network
description: SAS Global Forum 2017
img: assets/img/img1.jpg
importance: 5
category: application
---

## Construct a Disease Network

This project was from SAS competition 2016 in South Korea, and accepted from SAS Global Forum 2017.

In this study, we want to construct a disease network using the insurance data in Korea. Since most of Korea people have insurance by government ([HIRA](https://www.hira.or.kr/main.do)), we can obtain diagonosis data of most of Koreans from the claims of health insurance.

To define the correlation between disease (edges), I constructed contingency tables for every 4,095 pairs of 91 disease, and conducted `CMH(Cochran-Mantel-Haenszel) tests`. And I filtered nodes by $$\alpha = 0.0001$$, and I computed odd ratios as a weighted node. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/img2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Network from the result of contingency table analysis
</div>
The spurious associations is from the fact that the CI of odd ratio is too large because of small number of data set.

Moreover, I used `Bayesian network modeling` to construct a disease network. By Bayese theory, we can compute conditional probability, which can be represented as nodes. There are several Bayesian network models. `TAN(Tree Augmented Naive Bayes)` and `BAN(Bayesian Network Augmented Naive Bayes)` were applied in this study. Both models require a target or response variable. we set the target variable as age(categorical) and divided data set by sex, because we want to see the change of the network by age and sex. Then we can obtain network figure as follows.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/img3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    An example of network of TAN (Female over 60)
</div>

As you can see from the above table, we can recognize each disease cluster from TAN. On the other hands, BAN has more complex structure than TAN, so we focused on the specific disease related network not the overall network as TAN. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/img4.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    An example of network of BAN (Female over 60)
    From left *Dementia, High-blood-pressure* and *Cerebral infarction*
</div>

