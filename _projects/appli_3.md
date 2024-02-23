---
layout: page
title: Anomaly Detection
description: Millet poster 2019
img: assets/img/img3_1.jpg
importance: 2
category: application
---

## Robust Anomaly Detection in Cyber Physical System using Kullback-Leibler Divergence in Error Distributions

We investigate anomaly detection in Cyber-Physical System (CPS), where anomalies are attacks to CPS to disrupt the operations of critical infrastructures. We use the Secure Water Treatment (SWaT) systems dataset, where normal and attack states are simulated in the water tanks. Among different types of anomalies, we focus on detecting the contextual anomalies, which can be challenging to detect with the Out-Of-Limit threshold method. Recent research shows promising results in detecting anomalies from analyzing error distributions from the machine learning classifier. Similarly, we statistically analyze prediction error patterns from Recurrent Neural Network (RNN) and Mixture Density Network (MDN) classifieres to detect anomalies. 

First, we generate anomaly scores with Local Outlier Factor (LOF) and remove point anomalies. With the fixed window size, an empirical probability distribution is estimated. and we apply the sliding window to measure the difference of probability distributions between the other windows. To measure the difference eifficiently between anomalies and normal data, we use Kullbakck-Leibler divergence. Our preliminary result shows that we can effectively detect contextual anomalies compared with Nearest Neighbor Distance (NND) approach. 


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/img3_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example of contextual anomalies (red arrow) that are below the threshold (red dotted line), where the Xaxis indicates time instances and the Y-axis is predicted error from neural networks. Thus, contextual anomalies are not detected by the OOL method. 
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/img3_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Local Outlier Factor score vs the values of each data feature in the same time window of P4 sub-station.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/img3_4.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Prediction error produced from neural networks measured at P1 (raw water supply and storage).
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/img3_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    KL divergence with a window of size 180 and interval 10 measured at P1 (raw water supply and storage).
</div>