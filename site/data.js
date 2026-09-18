window.DATA = {
 "projects": [
  {
   "slug": "ljm",
   "title": "Local Joint Model (LJM)",
   "kind": "Manuscript",
   "meta": "In preparation",
   "glyph": "trajectory",
   "body": "Dynamic prediction of survival outcomes from multiple longitudinal biomarkers. At a landmark time the biomarkers follow a local linear mixed-effects model whose subject-specific coefficients are the current value and the instantaneous rate of change; the survival model conditions on these latent quantities through a transformation function G, with Cox proportional hazards and proportional odds as special cases. Estimated with PAQ-EM, a projected adaptive-quadrature EM algorithm, and released as an R package.",
   "sections": [
    {
     "heading": "The problem",
     "body": "In dynamic prediction the goal is the conditional survival risk of an individual who remains event-free at a landmark time s. Two families of methods dominate, and each gives something up.",
     "bullets": [
      "Landmarking feeds recent biomarker values and a crude estimate of their change directly into the survival model; with noisy longitudinal observations this performs poorly.",
      "Two-stage landmarking first models the trajectories, then feeds the estimates forward — strong only when the longitudinal model is well specified, and carrying first-stage uncertainty into second-stage inference is case-specific and computationally intensive.",
      "Joint models share random effects across both processes, but predictions degrade under misspecification, and because they model longitudinal and survival processes at concurrent times it is hard to isolate the effect of the current value versus the current slope."
     ]
    },
    {
     "heading": "The model",
     "body": "At landmark time s, the longitudinal biomarkers are modeled by a local linear mixed-effects specification whose subject-specific coefficients are exactly the true current value and the instantaneous rate of change of each biomarker. The survival model conditions directly on these latent quantities and is kept flexible through a transformation function G, with the Cox proportional hazards model and the proportional odds model as special cases.",
     "bullets": [
      "No global specification of the biomarker trajectories is required — local linearity holds near s under weak smoothness assumptions.",
      "The effects of current value and current slope on conditional risk are parameterized directly.",
      "Longitudinal and survival components are estimated jointly by maximizing a kernel-weighted local joint likelihood, which stabilizes estimation under noisy observations."
     ]
    },
    {
     "heading": "Estimation",
     "body": "With K biomarkers the local model carries 2K random effects, so a direct E-step is a 2K-dimensional integral. PAQ-EM, a projected adaptive-quadrature EM algorithm, uses the fact that the survival likelihood depends on the random effects only through one linear combination, and replaces the multivariate integral with a one-dimensional adaptive quadrature along that direction.",
     "bullets": [
      "Computation stays practical as the number of biomarkers grows.",
      "Association parameters can be constant or time-varying through B-splines, with confidence bands.",
      "Implemented in R with Rcpp; the package is on GitHub."
     ]
    },
    {
     "heading": "Application",
     "body": "Simulation studies cover irregular visit designs and strongly nonlinear trajectories across measurement-error variances, and compare against landmarking, two-stage landmarking and standard joint models by time-dependent AUC and prediction error. The method is applied to the PBC data, recovering individual conditional-risk curves at landmark s = 5 for three biomarkers.",
     "bullets": []
    },
    {
     "heading": "Status",
     "body": "With Dr. Kehui Chen, University of Pittsburgh. The single-biomarker version, Jointly Estimated Landmarking (JEL), is under review; the multivariate LJM manuscript is in preparation. Presented at JSM 2024 (Biometrics Section, Modern Advances in Time-to-event Data Analysis) and the Keystone State Statistics Symposium.",
     "bullets": []
    }
   ]
  },
  {
   "slug": "three-way",
   "title": "Three-Way Network Dynamics",
   "kind": "Manuscript",
   "meta": "In preparation",
   "glyph": "network",
   "body": "A stochastic actor-oriented model (SAOM) for longitudinal cognitive social structure data: the tie from sender j to receiver k as perceived by actor i, observed over time. Perceptions and self-reported ties evolve together by micro-steps, implemented as an extension of the RSiena package. With Dr. Nynke Niezink.",
   "sections": [
    {
     "heading": "Setting",
     "body": "Network dynamic models treat a tie as indexed by a sender and a receiver. Cognitive social structure data add a third mode, the perceiver: every actor reports the whole network as they see it. Three-way representations with perceiver, sender and receiver roles are well established, but their longitudinal analysis was previously not possible, even though theories such as balance theory concern both network perceptions and network change.",
     "bullets": []
    },
    {
     "heading": "The model",
     "body": "Each perceiver's slice and the self-reported network change by micro-steps in continuous time. Rate parameters are slice-specific, while evaluation parameters can be shared across perceivers or left perceiver-specific. Effects are organized by which network a micro-step changes and which network it reads.",
     "bullets": [
      "Within-network effects, such as density and reciprocity inside a slice.",
      "Self-reports that reference the perceptions of peers.",
      "Perceptions that reference self-reports: agreement with a self-reported tie, reciprocity to a self-tie.",
      "Array-wide effects that have no single-slice form."
     ]
    },
    {
     "heading": "Estimation and fit",
     "body": "Parameters are estimated by the method of moments, with cross-lagged statistics for the effects that link perceptions and self-reports. The Monte Carlo goodness-of-fit test of RSiena is extended with statistics defined across perceived slices, such as the spread of slice densities and the agreement between perceivers. In simulations at values estimated from data, perception-side parameters are recovered without bias and with nominal coverage from a single period, while the self-reported side requires several periods.",
     "bullets": []
    },
    {
     "heading": "Application",
     "body": "Longitudinal friendship perception data collected among 20 students in a six-week summer course.",
     "bullets": []
    },
    {
     "heading": "Status",
     "body": "Manuscript in preparation with Dr. Nynke Niezink at the Institute of Complex Social Dynamics and the Department of Statistics & Data Science, Carnegie Mellon University. The implementation lives in a fork of RSiena on GitHub. Presented at INSNA Sunbelt 2026 and JSM 2026.",
     "bullets": []
    }
   ]
  },
  {
   "slug": "nalfpca",
   "title": "Network-Assisted Localized FPCA",
   "kind": "Manuscript",
   "meta": "In preparation",
   "glyph": "netcurve",
   "body": "Localized functional principal component analysis for brain imaging data. A Fantope-based sparse estimator is combined with a graph smoothness penalty built from a functional connectivity network, so that eigenfunctions are localized and smooth along network edges rather than along anatomical distance.",
   "sections": [
    {
     "heading": "Idea",
     "body": "FPCA summarizes the dominant patterns of brain activity measured over many regions of interest. The eigenfunctions are hard to interpret unless they are both localized and smooth, but smoothness defined by anatomical proximity is inappropriate for brain data, where functionally coupled regions can be physically distant. Here smoothness is defined on a functional connectivity network instead.",
     "bullets": []
    },
    {
     "heading": "Method",
     "body": "Builds on the localized FPCA of Chen and Lei (2015), solved by ADMM over the Fantope.",
     "bullets": [
      "A quadratic graph Laplacian penalty encourages eigenfunctions that vary smoothly along network edges; an ℓ1 penalty keeps them localized.",
      "The smoothing parameter is chosen by a cross-validation criterion that involves all reported components, since components can tolerate very different amounts of smoothing on a graph.",
      "The localization parameter is chosen by a fraction-of-variance rule that stays stable when the number of regions exceeds the sample size."
     ]
    },
    {
     "heading": "Evidence",
     "body": "Simulations on stochastic block models and on real functional connectivity graphs: for eigenfunctions supported on network modules the estimator reduces integrated squared error relative to sparse PCA, most strongly at small sample sizes, and recovers the supporting modules with higher precision.",
     "bullets": []
    },
    {
     "heading": "Application",
     "body": "Working-memory magnetoencephalography from the Human Connectome Project, and longitudinal resting-state fMRI from ADNI, where component scores enter a joint model for conversion risk.",
     "bullets": []
    },
    {
     "heading": "Status",
     "body": "Manuscript in preparation with Dr. Kehui Chen, from doctoral work at the University of Pittsburgh.",
     "bullets": []
    }
   ]
  },
  {
   "slug": "pkqr",
   "title": "Penalized Kernel Quantile Regression",
   "kind": "Published",
   "meta": "2022 · JSPI",
   "glyph": "fan",
   "body": "Identifies the partially linear structure of a varying coefficient quantile model, with a proximal ADMM algorithm and a plug-in bandwidth rule from high-dimensional kernel theory.",
   "sections": [
    {
     "heading": "Contribution",
     "body": "Published in the Journal of Statistical Planning and Inference, 2022, with Eun Ryung Lee and Seyoung Park.",
     "bullets": [
      "A method that identifies the partially linear structure of the varying coefficient model.",
      "An efficient algorithm using the proximal alternating direction method of multipliers, with a convergence guarantee.",
      "A novel plug-in bandwidth selection rule derived from high-dimensional kernel theory."
     ]
    },
    {
     "heading": "Model",
     "body": "For a quantile level τ, the τ-th varying coefficient quantile regression expresses the response as a sum of coefficient functions of an index variable multiplied by covariates, with the conditional τ-th quantile of the error set to zero. Smooth coefficient functions are approximated locally linearly and estimated by minimizing a kernel-weighted check loss, integrated over the index and penalized to recover structure.",
     "bullets": []
    },
    {
     "heading": "Origin",
     "body": "Extends the M.S. thesis at Sungkyunkwan University, \"Penalized Kernel Quantile Regression for Varying Coefficient Models\". Presented at the Korean Statistical Society, 2018 — graduate academic paper presentation award, 2nd place.",
     "bullets": []
    }
   ]
  },
  {
   "slug": "methylation-adhd",
   "title": "Methylation and ADHD",
   "kind": "Published",
   "meta": "2023 · Sci. Reports",
   "glyph": "manhattan",
   "body": "First co-author. Prenatal sulfur dioxide exposure, genome-wide DNA methylation at ages 2 and 6, and ADHD rating scales at ages 4, 6 and 8 in a cohort of 329 mother–child pairs.",
   "sections": [
    {
     "heading": "Question",
     "body": "Whether epigenetic influence plays a role in the association between air pollution exposure and attention deficit hyperactivity disorder. Published in Scientific Reports, 2023; Cho and Choi contributed equally.",
     "bullets": []
    },
    {
     "heading": "Design",
     "body": "A mother–child cohort of 329. Prenatal SO₂ exposure was related to ADHD rating scale (ARS) measured repeatedly at ages 4, 6 and 8. Whole blood was drawn at ages 2 and 6, and genome-wide DNA methylation was assayed for 51 children on the Illumina Infinium HumanMethylation BeadChip.",
     "bullets": []
    },
    {
     "heading": "Findings",
     "body": "",
     "bullets": [
      "Prenatal SO₂ exposure was associated with ADHD symptoms.",
      "Candidate gene analysis: methylation at 6 CpGs at age 2 was associated with prenatal SO₂ exposure levels.",
      "Of those, cg07583420 (INS-IGF2) was persistently linked with ARS at ages 4, 6 and 8.",
      "Epigenome-wide analysis: methylation at 6,733 CpG sites was associated with prenatal SO₂ exposure; 58 CpGs in the Notch signalling pathway were further associated with ARS at all three ages.",
      "Methylation at age 6 was not associated with prenatal SO₂ exposure."
     ]
    }
   ]
  },
  {
   "slug": "anomaly",
   "title": "Anomaly Detection in Cyber-Physical Systems",
   "kind": "Published",
   "meta": "2019 · MileTS19",
   "glyph": "window",
   "body": "Contextual anomalies in the SWaT water-treatment dataset, found by measuring Kullback–Leibler divergence between sliding-window error distributions from RNN and MDN classifiers.",
   "sections": [
    {
     "heading": "Problem",
     "body": "Anomaly detection in cyber-physical systems, where anomalies are attacks intended to disrupt critical infrastructure. The Secure Water Treatment (SWaT) dataset simulates normal and attack states across water tanks. The focus is contextual anomalies, which the out-of-limit threshold method misses because they sit below the threshold.",
     "bullets": []
    },
    {
     "heading": "Method",
     "body": "Prediction error patterns from recurrent neural network and mixture density network classifiers are analyzed statistically rather than thresholded.",
     "bullets": [
      "Generate anomaly scores with Local Outlier Factor and remove point anomalies.",
      "Estimate an empirical error distribution over a fixed window size.",
      "Slide the window and measure Kullback–Leibler divergence between distributions."
     ]
    },
    {
     "heading": "Result",
     "body": "Contextual anomalies are detected more effectively than with a nearest neighbor distance approach. 5th Workshop on Mining and Learning from Time Series (MileTS19), Anchorage, Alaska.",
     "bullets": []
    }
   ]
  },
  {
   "slug": "excess-mortality",
   "title": "COVID-19 Excess Mortality",
   "kind": "Application",
   "meta": "2020 · SNU",
   "glyph": "band",
   "body": "Random forest prediction intervals for monthly Korean mortality, compared against SARIMA and the EuroMOMO GLM baseline.",
   "sections": [
    {
     "heading": "Definition",
     "body": "Excess mortality is the number of deaths from all causes during a crisis above what would be expected under normal conditions. For COVID-19 it measures total pandemic impact better than confirmed COVID-19 death counts alone. Simple approaches compare this year against a five-year average, but mortality rises every year in an aging society.",
     "bullets": []
    },
    {
     "heading": "The GLM baseline and its limits",
     "body": "EuroMOMO models a mortality baseline with an overdispersed Poisson GLM, using sine and cosine terms for seasonality; FLUMOMO extends this with weekly influenza activity and temperature.",
     "bullets": [
      "Assumes a Poisson distribution with overdispersion.",
      "Sine and cosine seasonality is a strong assumption.",
      "Ignores correlation between features such as influenza activity and extreme temperature.",
      "Ignores the serial correlation structure of the time series."
     ]
    },
    {
     "heading": "Approach",
     "body": "Reflect the serial correlation of mortality directly and use 95% prediction intervals to estimate 2020 excess mortality from monthly Korean total mortality. Three random forest methods were compared against SARIMA.",
     "bullets": [
      "Only one region showed excess mortality: Daegu, March 2020."
     ]
    },
    {
     "heading": "Status",
     "body": "Seoul National University project, not published.",
     "bullets": []
    }
   ]
  },
  {
   "slug": "medical-services",
   "title": "Demand and Supply of Medical Services",
   "kind": "Application",
   "meta": "2019 — 2020 · SNU",
   "glyph": "cross",
   "body": "Sixty-year projections of medical service demand and supply across Statistics Korea birth-rate scenarios, with regional distributions to 2047.",
   "sections": [
    {
     "heading": "Goal",
     "body": "Project at the Seoul National University College of Medicine with Dr. Yun-Chul Hong. To prepare for the next sixty years, demand and supply of medical services were projected across scenarios. All rights reserved by the college.",
     "bullets": []
    },
    {
     "heading": "Method",
     "body": "Scenarios follow the birth rate simulations published by Statistics Korea. Demand was projected from past medical demand per capita by age group; supply was projected from the number of medical students admitted annually. Because the data accumulate annually over only a few years, basic statistical methods were used rather than machine learning.",
     "bullets": []
    },
    {
     "heading": "Outputs",
     "body": "Estimated total demand and the demand–supply gap under present conditions, plus regional distributions for 2018 and projections to 2047 under both fixed and increased supply.",
     "bullets": []
    }
   ]
  },
  {
   "slug": "disease-network",
   "title": "Disease Network from Insurance Claims",
   "kind": "Application",
   "meta": "2017 · SAS Global Forum",
   "glyph": "network",
   "body": "A network over 91 diseases built from HIRA claims using CMH tests on 4,095 disease pairs, alongside TAN and BAN Bayesian network models stratified by age and sex.",
   "sections": [
    {
     "heading": "Data",
     "body": "From the 14th SAS Analytics Championship in Korea, 2016 (2nd place), accepted at SAS Global Forum 2017. Because most Koreans are insured through HIRA, diagnosis data for most of the population is available from insurance claims.",
     "bullets": []
    },
    {
     "heading": "Edges by contingency table",
     "body": "Contingency tables were built for all 4,095 pairs of 91 diseases and Cochran–Mantel–Haenszel tests applied. Nodes were filtered at α = 0.0001 and odds ratios used as weights. Spurious associations remain where the odds ratio confidence interval is wide due to small counts.",
     "bullets": []
    },
    {
     "heading": "Edges by Bayesian network",
     "body": "Tree Augmented Naive Bayes (TAN) and Bayesian Network Augmented Naive Bayes (BAN) were fitted with age as the categorical target, split by sex, to see how the network changes with age and sex. TAN yields readable disease clusters; BAN is more complex, so analysis focused on specific disease neighborhoods — for women over 60, dementia, high blood pressure, and cerebral infarction.",
     "bullets": []
    }
   ]
  },
  {
   "slug": "microbiome",
   "title": "Microbiome Analysis Tutorial",
   "kind": "Teaching",
   "meta": "2019 · SNU",
   "glyph": "tree",
   "body": "A phyloseq walkthrough written for the lab: phylogenetic trees, abundance bar graphs, heatmaps, and alpha and beta diversity.",
   "sections": [
    {
     "heading": "Purpose",
     "body": "A microbiome data analysis tutorial written for the lab at Seoul National University, covering the phyloseq workflow end to end in R.",
     "bullets": []
    },
    {
     "heading": "Contents",
     "body": "",
     "bullets": [
      "Loading .biom data as the four phyloseq classes: OTU table, sample data, taxonomy table, phylogenetic tree.",
      "Generating a phylogenetic tree from denovo sequences with adegenet and ape.",
      "Relative and standardized abundance bar graphs with ggplot2.",
      "Heatmaps with taxonomy filtering by count.",
      "Alpha diversity: Chao1, Shannon, Simpson.",
      "Beta diversity: unifrac, weighted unifrac, Bray–Curtis, DPCoA, reduced by NMDS and PCoA."
     ]
    }
   ]
  }
 ],
 "publications": [
  {
   "group": "In preparation",
   "selected": true,
   "title": "Survival Prediction with Multiple Longitudinal Biomarkers: Transformation Models and a Local Likelihood Approach",
   "authors": "Jinwoo Cho, Kehui Chen",
   "venue": "Local joint model (LJM)",
   "url": "#/p/ljm",
   "link": "Project"
  },
  {
   "group": "In preparation",
   "selected": true,
   "title": "Network-assisted localized functional principal component analysis for brain imaging data",
   "authors": "Jinwoo Cho, Kehui Chen",
   "venue": "",
   "url": "#/p/nalfpca",
   "link": "Project"
  },
  {
   "group": "In preparation",
   "selected": true,
   "title": "Longitudinal three-way network models for social network perceptions",
   "authors": "Jinwoo Cho, Nynke M.D. Niezink",
   "venue": "",
   "url": "#/p/three-way",
   "link": "Project"
  },
  {
   "group": "Submitted",
   "selected": true,
   "title": "Dynamic prediction of survival outcomes using Jointly Estimated Landmarking approach",
   "authors": "Jinwoo Cho, Kehui Chen",
   "venue": "",
   "url": "https://github.com/kevinjwcho/JEL",
   "link": "Code"
  },
  {
   "group": "Published",
   "selected": true,
   "title": "DNA methylation is associated with prenatal exposure to sulfur dioxide and childhood attention-deficit hyperactivity disorder symptoms",
   "authors": "Yoon-Jung Choi, Jinwoo Cho, Yun-Chul Hong, … Youn-Hee Lim — Cho and Choi contributed equally",
   "venue": "Scientific Reports, 13(1), 3501, 2023",
   "url": "https://www.nature.com/articles/s41598-023-29843-y",
   "link": "HTML"
  },
  {
   "group": "Published",
   "selected": true,
   "title": "Penalized kernel quantile regression for varying coefficient models",
   "authors": "Eun Ryung Lee, Jinwoo Cho, Seyoung Park",
   "venue": "Journal of Statistical Planning and Inference, 217, 8–23, 2022",
   "url": "https://www.sciencedirect.com/science/article/abs/pii/S0378375821000707",
   "link": "HTML"
  },
  {
   "group": "Published",
   "title": "Prenatal and postnatal exposures to four metals mixture and IQ in 6-year-old children: A prospective cohort study in South Korea",
   "authors": "Kyung-Shin Lee, Kyoung-Nam Kim, Young-Don Ahn, Yoon-Jung Choi, Jinwoo Cho, Yebin Jang, … Yun-Chul Hong",
   "venue": "Environment International, 157, 106798, 2021",
   "url": "",
   "link": ""
  },
  {
   "group": "Published",
   "title": "Environmental and Genetic Risk Factors of Congenital Anomalies: an Umbrella Review of Systematic Reviews and Meta-Analyses",
   "authors": "Kyung-Shin Lee, Yoon-Jung Choi, Jinwoo Cho, Hyunji Lee, Heejin Lee, Soo Jin Park, … Yun-Chul Hong",
   "venue": "Journal of Korean Medical Science, 36(28), 2021",
   "url": "",
   "link": ""
  },
  {
   "group": "Published",
   "title": "Association Between Sleep Duration and Intelligence Quotient in 6-Year-Old Children",
   "authors": "Kyung-Shin Lee, Johanna Inhyang Kim, Yoon-Jung Choi, Jinwoo Cho, Youn-Hee Lim, Bung-Nyun Kim, … Yun-Chul Hong",
   "venue": "International Journal of Behavioral Medicine, 2021",
   "url": "",
   "link": ""
  },
  {
   "group": "Published",
   "title": "Types of COVID-19 clusters and their relationship with social distancing in the Seoul metropolitan area, South Korea",
   "authors": "Yoon-Jung Choi, Min-Jung Park, Soo Jin Park, Dahye Hong, Sangmin Lee, Kyung-Shin Lee, Jinwoo Cho, … Jong-Koo Lee",
   "venue": "International Journal of Infectious Diseases, 106, 363–369, 2021",
   "url": "",
   "link": ""
  },
  {
   "group": "Published",
   "title": "Associations between surrounding residential greenness and intelligence quotient in 6-year-old children",
   "authors": "Kyung-Shin Lee, Bung-Nyun Kim, Jinwoo Cho, Yebin Yeji Jang, Yoon-Jung Choi, Woo-Seok Lee, … Yun-Chul Hong",
   "venue": "Science of the Total Environment, 759, 143561, 2021",
   "url": "",
   "link": ""
  },
  {
   "group": "Published",
   "title": "Children's Greenness Exposure and IQ-Associated DNA Methylation: A Prospective Cohort Study",
   "authors": "Kyung-Shin Lee, Yoon-Jung Choi, Jinwoo Cho, Sungji Moon, Youn-Hee Lim, Johanna Inhyang Kim, … Yun-Chul Hong",
   "venue": "International Journal of Environmental Research and Public Health, 18(14), 7429, 2021",
   "url": "",
   "link": ""
  },
  {
   "group": "Published",
   "title": "Effect of prenatal bisphenol A exposure on child's obesity through epigenetic influence on insulin-like growth factor 2 receptor (IGF2R) gene",
   "authors": "Yoon-Jung Choi, Kyung-Shin Lee, Yun-Chul Hong, Jinwoo Cho, et al.",
   "venue": "Environment International, 143, 105929, 2020",
   "url": "",
   "link": ""
  },
  {
   "group": "Published",
   "title": "A systematic review on model selection in high-dimensional regression",
   "authors": "Eun Ryung Lee, Jinwoo Cho, Kyusang Yu",
   "venue": "Journal of the Korean Statistical Society, 48(1), 1–12, 2019",
   "url": "",
   "link": ""
  },
  {
   "group": "Published",
   "title": "Robust Anomaly Detection in Cyber Physical System using Kullback-Leibler Divergence in Error Distributions",
   "authors": "Jinwoo Cho, et al.",
   "venue": "5th Workshop on Mining and Learning from Time Series (MileTS19), Anchorage, Alaska, 2019",
   "url": "",
   "link": ""
  }
 ],
 "news": [
  {
   "date": "Aug 01, 2025",
   "text": "I have begun a special faculty position at CMU."
  },
  {
   "date": "Feb 21, 2024",
   "text": "I have been awarded the Mellon Fellowship for the 2024–2025 academic year."
  },
  {
   "date": "Oct 08, 2023",
   "text": "I have a poster presentation at the Keystone State Symposium, Penn State University."
  }
 ],
 "software": [
  {
   "name": "LJM",
   "status": "GitHub · v2.2",
   "body": "Local joint model for dynamic survival prediction from one or several longitudinal biomarkers: transformation survival models, time-varying associations via B-splines, the PAQ-EM algorithm, and time-dependent AUC and prediction error. Currently distributed under its earlier name, JEL (Jointly Estimated Landmarking).",
   "url": "https://github.com/kevinjwcho/JEL",
   "link": "GitHub",
   "install": "remotes::install_github(\"kevinjwcho/JEL\")"
  },
  {
   "name": "rsiena (three-way fork)",
   "status": "Fork · branch Jinwoo",
   "body": "Fork of RSiena that adds three-way dependent variables for longitudinal cognitive social structure data, with slice-specific rates, shared or perceiver-specific parameters, and three-way effects and goodness-of-fit statistics.",
   "url": "https://github.com/kevinjwcho/rsiena/tree/Jinwoo",
   "link": "GitHub",
   "install": "remotes::install_github(\"kevinjwcho/rsiena\", ref = \"Jinwoo\")"
  }
 ],
 "cvSummary": [
  {
   "year": "2025 — present",
   "title": "Special Faculty (Postdoc)",
   "org": "Carnegie Mellon University, Statistics"
  },
  {
   "year": "2020 — 2025",
   "title": "Ph.D., Statistics",
   "org": "University of Pittsburgh"
  },
  {
   "year": "2019 — 2020",
   "title": "Research Associate",
   "org": "Seoul National University College of Medicine"
  },
  {
   "year": "2016 — 2018",
   "title": "M.S., Statistics",
   "org": "Sungkyunkwan University"
  },
  {
   "year": "2010 — 2016",
   "title": "B.Econ., Statistics",
   "org": "Sungkyunkwan University"
  }
 ],
 "cv": [
  {
   "heading": "Employment",
   "items": [
    {
     "year": "Aug 2025 — present",
     "title": "Special Faculty (Post-Doctoral Fellow, Full-time)",
     "org": "Carnegie Mellon University",
     "notes": [
      "Department of Statistics (Adviser: Dr. Nynke Niezink)",
      "Institute of Complex Social Dynamics (ICSD)",
      "Longitudinal three-way network analysis",
      "Stochastic Actor-Oriented Model (SAOM)"
     ]
    },
    {
     "year": "Jul 2019 — Jul 2020",
     "title": "Research Associate (Full-time)",
     "org": "Seoul National University College of Medicine",
     "notes": [
      "Advised by Dr. Yun-Chul Hong",
      "Managed EDC project and elderly cohort data",
      "Analyzed microbiome, EWAS, GWAS, and longitudinal data",
      "Forecasted demand and supply for the medical workforce",
      "Developed algorithms for a healthcare system"
     ]
    },
    {
     "year": "Jul 2017 — Jun 2019",
     "title": "Teaching and Research Assistant (Part-time)",
     "org": "Department of Information Statistics, Korean National Open University",
     "notes": []
    },
    {
     "year": "May 2018 — Sep 2018",
     "title": "Model Developer (Part-time)",
     "org": "Begas, Inc., Seoul, South Korea",
     "notes": [
      "Shinhan Investment Corporation project",
      "Stock markets index prediction using functional data analysis and R"
     ]
    },
    {
     "year": "Sep 2017 — Aug 2018",
     "title": "Research Assistant (Full-time)",
     "org": "Research Institute of Applied Statistics, Sungkyunkwan University",
     "notes": [
      "Statistical consulting",
      "R and SAS programming teaching"
     ]
    },
    {
     "year": "Jan 2017 — Feb 2017",
     "title": "Intern (Full-time)",
     "org": "SAS Korea",
     "notes": []
    }
   ]
  },
  {
   "heading": "Education",
   "items": [
    {
     "year": "Aug 2020 — Aug 2025",
     "title": "Ph.D. in Statistics",
     "org": "University of Pittsburgh, PA, US",
     "notes": [
      "Adviser: Dr. Kehui Chen"
     ]
    },
    {
     "year": "Sep 2016 — Aug 2018",
     "title": "Master of Science in Statistics",
     "org": "Sungkyunkwan University, Seoul, South Korea",
     "notes": [
      "Adviser: Dr. Eun Ryung Lee",
      "Thesis: Penalized Kernel Quantile Regression for Varying Coefficient Models"
     ]
    },
    {
     "year": "Mar 2010 — Aug 2016",
     "title": "Bachelor of Economics, Statistics",
     "org": "Sungkyunkwan University, Seoul, South Korea",
     "notes": []
    }
   ]
  },
  {
   "heading": "Teaching",
   "items": [
    {
     "year": "2024 — 2025 AY",
     "title": "TA mentor",
     "org": "University of Pittsburgh",
     "notes": [
      "Provided peer advice to TAs and TFs on classroom management and grading",
      "Reported TA and TF concerns to enhance teaching practices",
      "Disseminated instructional resources from the Dean's Office and Teaching Center"
     ]
    },
    {
     "year": "Summer 2022, 2023",
     "title": "Instructor — STAT 1000: Applied Statistical Methods",
     "org": "University of Pittsburgh",
     "notes": [
      "Introduction to statistics for undergraduates, six weeks"
     ]
    },
    {
     "year": "2021 — 2024",
     "title": "Teaching Assistant",
     "org": "University of Pittsburgh",
     "notes": [
      "Summer 2024: STAT 1000",
      "Spring 2024: STAT 1311 Applied Multivariate Analysis, STAT 3694 Topics in Advanced STAT 4",
      "Fall 2023: STAT 2711 Probability Theory I, STAT 2261 Survival Analysis, STAT 1341 Sports Analytics",
      "Spring 2023: STAT 2641 Asymptotic Statistics, STAT 1100",
      "Fall 2022: STAT 1000 Applied Statistical Methods",
      "Fall 2021: STAT 1201 Applied Nonparametric Statistics",
      "Spring 2021: STAT 1100 Statistics and Probability for Business Management"
     ]
    }
   ]
  },
  {
   "heading": "Honors and Awards",
   "items": [
    {
     "year": "Feb 2024",
     "title": "Andrew Mellon Predoctoral Fellowship",
     "org": "The Dietrich School of Arts & Sciences, University of Pittsburgh",
     "notes": [
      "One-year fellowship, 2024–2025 AY"
     ]
    },
    {
     "year": "Aug 2020",
     "title": "Arts and Sciences Fellowship",
     "org": "The Dietrich School of Arts & Sciences, University of Pittsburgh",
     "notes": [
      "One-year fellowship, 2020–2021 AY"
     ]
    },
    {
     "year": "May 2018",
     "title": "Graduate academic paper presentation award, 2nd place",
     "org": "The Korean Statistical Society",
     "notes": [
      "Presentation: Penalized Local Linear Quantile Regression for Varying Coefficient Models"
     ]
    },
    {
     "year": "Apr 2017, Apr 2018",
     "title": "SAS Student Ambassador",
     "org": "SAS Global Forum — Orlando, FL and Denver, CO",
     "notes": [
      "Presentation: Construction of a Disease Network and a Prediction Model for Dementia Using Health Insurance Claim Data in Korea",
      "Poster: Analysis of Profitability-Bank Systems in South Korea Using SAS Base"
     ]
    },
    {
     "year": "Sep 2016",
     "title": "The 14th SAS Analytics Championship in Korea, 2nd place",
     "org": "SAS Korea",
     "notes": [
      "Topic: Analyze and Construct a Network of Diseases in which Koreans are Interested"
     ]
    },
    {
     "year": "2015 — 2018",
     "title": "Academic Scholarship",
     "org": "Sungkyunkwan University",
     "notes": [
      "Simsan scholarship for graduate students: Spring 2018, Fall 2017",
      "Academic excellence scholarship for undergraduates: Spring 2016, Fall 2015"
     ]
    }
   ]
  },
  {
   "heading": "Professional Service",
   "items": [
    {
     "year": "Reviewer",
     "title": "Manuscript reviewer",
     "org": "Journal of Statistical Software",
     "notes": []
    }
   ]
  },
  {
   "heading": "Presentation and Poster",
   "items": [
    {
     "year": "2026",
     "title": "Longitudinal three-way network analysis",
     "org": "INSNA Sunbelt 2026",
     "notes": []
    },
    {
     "year": "2026",
     "title": "Longitudinal three-way network analysis",
     "org": "JSM 2026",
     "notes": []
    },
    {
     "year": "May 2025",
     "title": "Dynamic prediction for survival outcomes with intensively observed longitudinal predictors",
     "org": "Sungkyunkwan University Seminar, Seoul, Korea",
     "notes": []
    },
    {
     "year": "Aug 2024",
     "title": "Dynamic prediction for survival outcomes with intensively observed longitudinal predictors",
     "org": "JSM 2024, Portland, Oregon — Biometrics Section presentation",
     "notes": []
    },
    {
     "year": "Oct 2023",
     "title": "Dynamic prediction for survival outcomes with intensively observed longitudinal predictors",
     "org": "Keystone State Statistics Symposium, Penn State University — poster",
     "notes": []
    }
   ]
  },
  {
   "heading": "Technical Strengths",
   "items": [
    {
     "year": "Languages",
     "title": "R, Rcpp, Python, MATLAB, LaTeX, SAS",
     "org": "",
     "notes": []
    },
    {
     "year": "Spoken",
     "title": "Korean (native), English (fluent)",
     "org": "",
     "notes": []
    },
    {
     "year": "Contact",
     "title": "jinoojwcho@cmu.edu · kevinjwcho@gmail.com",
     "org": "Department of Statistics, Carnegie Mellon University",
     "notes": []
    }
   ]
  }
 ]
};
