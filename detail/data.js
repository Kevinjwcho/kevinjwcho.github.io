window.DATA = {
 "projects": [
  {
   "slug": "ljm",
   "title": "Local Joint Model (LJM)",
   "kind": "Manuscript",
   "meta": "In preparation",
   "glyph": "ljm",
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
   ],
   "card": {
    "label": "manuscript · in preparation",
    "title": "Local Joint Model",
    "body": "Dynamic prediction of survival from multiple longitudinal biomarkers. Local linear mixed effects at a landmark time, a transformation family that contains Cox and proportional odds, and PAQ-EM, which reduces the random-effects integral to one dimension. With Kehui Chen.",
    "tags": [
     "survival",
     "PAQ-EM",
     "R"
    ],
    "caption": "biomarkers up to landmark s, conditional risk after"
   },
   "plate": "<line x1=\"8\" y1=\"88\" x2=\"92\" y2=\"88\" stroke=\"#C3C6C8\"></line><line x1=\"8\" y1=\"88\" x2=\"8\" y2=\"12\" stroke=\"#C3C6C8\"></line><line x1=\"52\" y1=\"12\" x2=\"52\" y2=\"88\" stroke=\"#9AA0A5\" stroke-dasharray=\"3 3\"></line><circle cx=\"10\" cy=\"30\" r=\"1.7\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"16\" cy=\"27\" r=\"1.7\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"22\" cy=\"29\" r=\"1.7\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"30\" cy=\"26\" r=\"1.7\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"38\" cy=\"31\" r=\"1.7\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"45\" cy=\"33\" r=\"1.7\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"50\" cy=\"35\" r=\"1.7\" fill=\"#1A1C1D\" stroke=\"none\"></circle><line x1=\"40\" y1=\"31.5\" x2=\"60\" y2=\"37.5\" stroke=\"#1A1C1D\" stroke-dasharray=\"2.5 2.5\"></line><circle cx=\"10\" cy=\"58\" r=\"1.7\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"15\" cy=\"61\" r=\"1.7\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"22\" cy=\"55\" r=\"1.7\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"30\" cy=\"52\" r=\"1.7\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"38\" cy=\"50\" r=\"1.7\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"44\" cy=\"46\" r=\"1.7\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"50\" cy=\"44\" r=\"1.7\" fill=\"#9AA0A5\" stroke=\"none\"></circle><line x1=\"40\" y1=\"48.6\" x2=\"60\" y2=\"39.8\" stroke=\"#9AA0A5\" stroke-dasharray=\"2.5 2.5\"></line><circle cx=\"10\" cy=\"72\" r=\"1.7\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"16\" cy=\"76\" r=\"1.7\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"22\" cy=\"71\" r=\"1.7\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"31\" cy=\"73\" r=\"1.7\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"40\" cy=\"75\" r=\"1.7\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"47\" cy=\"76\" r=\"1.7\" fill=\"#C3C6C8\" stroke=\"none\"></circle><line x1=\"40\" y1=\"75\" x2=\"60\" y2=\"77\" stroke=\"#C3C6C8\" stroke-dasharray=\"2.5 2.5\"></line><path d=\"M52 84 H56 V80 H60 V70 H64 V58 H68 V44 H72 V34 H77 V26 H83 V20 H92\" stroke=\"#0066CC\" stroke-width=\"1.6\"></path>"
  },
  {
   "slug": "three-way",
   "title": "Three-Way Network Dynamics",
   "kind": "Manuscript",
   "meta": "In preparation",
   "glyph": "threeway",
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
     "body": "Manuscript in preparation with Dr. Nynke Niezink at the Institute of Complex Social Dynamics and the Department of Statistics & Data Science, Carnegie Mellon University. The implementation lives in a fork of RSiena on GitHub. Presented at the INSNA Sunbelt Conference 2026 (Daytona Beach), JSM 2026 (Boston), and in an invited seminar at Hanyang University.",
     "bullets": []
    }
   ],
   "card": {
    "label": "manuscript · in preparation",
    "title": "Three-Way Network Dynamics",
    "body": "A Stochastic Actor-Oriented Model for cognitive social structures: ties from sender to receiver as seen by each perceiver, evolving together with self-reported ties. Built as an extension of RSiena. With Nynke Niezink.",
    "tags": [
     "SAOM",
     "perception",
     "RSiena"
    ],
    "caption": "the network as perceived by one actor, wave 1 to 6"
   },
   "plate": "<line x1=\"27\" y1=\"10\" x2=\"12.3\" y2=\"35.5\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"27\" y1=\"10\" x2=\"10.3\" y2=\"24\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"41.7\" y1=\"35.5\" x2=\"32.8\" y2=\"43\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"41.7\" y1=\"35.5\" x2=\"16.1\" y2=\"14\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><circle cx=\"27\" cy=\"10\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"37.9\" cy=\"14\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"43.7\" cy=\"24\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"41.7\" cy=\"35.5\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"32.8\" cy=\"43\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"21.2\" cy=\"43\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"12.3\" cy=\"35.5\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"10.3\" cy=\"24\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"16.1\" cy=\"14\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><line x1=\"73\" y1=\"10\" x2=\"56.3\" y2=\"24\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"83.9\" y1=\"14\" x2=\"67.2\" y2=\"43\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"83.9\" y1=\"14\" x2=\"56.3\" y2=\"24\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"89.7\" y1=\"24\" x2=\"78.8\" y2=\"43\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"89.7\" y1=\"24\" x2=\"67.2\" y2=\"43\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"89.7\" y1=\"24\" x2=\"58.3\" y2=\"35.5\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"87.7\" y1=\"35.5\" x2=\"78.8\" y2=\"43\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"87.7\" y1=\"35.5\" x2=\"58.3\" y2=\"35.5\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"87.7\" y1=\"35.5\" x2=\"62.1\" y2=\"14\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"78.8\" y1=\"43\" x2=\"67.2\" y2=\"43\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"78.8\" y1=\"43\" x2=\"56.3\" y2=\"24\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"78.8\" y1=\"43\" x2=\"62.1\" y2=\"14\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"67.2\" y1=\"43\" x2=\"62.1\" y2=\"14\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><circle cx=\"73\" cy=\"10\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"83.9\" cy=\"14\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"89.7\" cy=\"24\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"87.7\" cy=\"35.5\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"78.8\" cy=\"43\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"67.2\" cy=\"43\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"58.3\" cy=\"35.5\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"56.3\" cy=\"24\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"62.1\" cy=\"14\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><line x1=\"27\" y1=\"56\" x2=\"37.9\" y2=\"60\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"27\" y1=\"56\" x2=\"41.7\" y2=\"81.5\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"27\" y1=\"56\" x2=\"32.8\" y2=\"89\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"27\" y1=\"56\" x2=\"21.2\" y2=\"89\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"27\" y1=\"56\" x2=\"12.3\" y2=\"81.5\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"27\" y1=\"56\" x2=\"16.1\" y2=\"60\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"37.9\" y1=\"60\" x2=\"43.7\" y2=\"70\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"37.9\" y1=\"60\" x2=\"41.7\" y2=\"81.5\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"37.9\" y1=\"60\" x2=\"32.8\" y2=\"89\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"37.9\" y1=\"60\" x2=\"21.2\" y2=\"89\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"37.9\" y1=\"60\" x2=\"12.3\" y2=\"81.5\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"37.9\" y1=\"60\" x2=\"10.3\" y2=\"70\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"37.9\" y1=\"60\" x2=\"16.1\" y2=\"60\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"43.7\" y1=\"70\" x2=\"41.7\" y2=\"81.5\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"43.7\" y1=\"70\" x2=\"32.8\" y2=\"89\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"43.7\" y1=\"70\" x2=\"21.2\" y2=\"89\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"43.7\" y1=\"70\" x2=\"12.3\" y2=\"81.5\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"43.7\" y1=\"70\" x2=\"16.1\" y2=\"60\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"41.7\" y1=\"81.5\" x2=\"32.8\" y2=\"89\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"41.7\" y1=\"81.5\" x2=\"21.2\" y2=\"89\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"41.7\" y1=\"81.5\" x2=\"10.3\" y2=\"70\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"41.7\" y1=\"81.5\" x2=\"16.1\" y2=\"60\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"32.8\" y1=\"89\" x2=\"21.2\" y2=\"89\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"32.8\" y1=\"89\" x2=\"12.3\" y2=\"81.5\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"32.8\" y1=\"89\" x2=\"10.3\" y2=\"70\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"32.8\" y1=\"89\" x2=\"16.1\" y2=\"60\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"21.2\" y1=\"89\" x2=\"12.3\" y2=\"81.5\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"21.2\" y1=\"89\" x2=\"10.3\" y2=\"70\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"12.3\" y1=\"81.5\" x2=\"10.3\" y2=\"70\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"12.3\" y1=\"81.5\" x2=\"16.1\" y2=\"60\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><line x1=\"10.3\" y1=\"70\" x2=\"16.1\" y2=\"60\" stroke=\"#9AA0A5\" stroke-width=\"0.8\"></line><circle cx=\"27\" cy=\"56\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"37.9\" cy=\"60\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"43.7\" cy=\"70\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"41.7\" cy=\"81.5\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"32.8\" cy=\"89\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"21.2\" cy=\"89\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"12.3\" cy=\"81.5\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"10.3\" cy=\"70\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><circle cx=\"16.1\" cy=\"60\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#1A1C1D\" stroke-width=\"1\"></circle><line x1=\"73\" y1=\"56\" x2=\"83.9\" y2=\"60\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"73\" y1=\"56\" x2=\"67.2\" y2=\"89\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"73\" y1=\"56\" x2=\"58.3\" y2=\"81.5\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"73\" y1=\"56\" x2=\"56.3\" y2=\"70\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"73\" y1=\"56\" x2=\"62.1\" y2=\"60\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"83.9\" y1=\"60\" x2=\"87.7\" y2=\"81.5\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"83.9\" y1=\"60\" x2=\"67.2\" y2=\"89\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"83.9\" y1=\"60\" x2=\"58.3\" y2=\"81.5\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"83.9\" y1=\"60\" x2=\"56.3\" y2=\"70\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"89.7\" y1=\"70\" x2=\"78.8\" y2=\"89\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"89.7\" y1=\"70\" x2=\"67.2\" y2=\"89\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"89.7\" y1=\"70\" x2=\"58.3\" y2=\"81.5\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"78.8\" y1=\"89\" x2=\"67.2\" y2=\"89\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"78.8\" y1=\"89\" x2=\"56.3\" y2=\"70\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"67.2\" y1=\"89\" x2=\"56.3\" y2=\"70\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"67.2\" y1=\"89\" x2=\"62.1\" y2=\"60\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"58.3\" y1=\"81.5\" x2=\"56.3\" y2=\"70\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"58.3\" y1=\"81.5\" x2=\"62.1\" y2=\"60\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><line x1=\"56.3\" y1=\"70\" x2=\"62.1\" y2=\"60\" stroke=\"#0066CC\" stroke-width=\"0.8\"></line><circle cx=\"73\" cy=\"56\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#0066CC\" stroke-width=\"1\"></circle><circle cx=\"83.9\" cy=\"60\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#0066CC\" stroke-width=\"1\"></circle><circle cx=\"89.7\" cy=\"70\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#0066CC\" stroke-width=\"1\"></circle><circle cx=\"87.7\" cy=\"81.5\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#0066CC\" stroke-width=\"1\"></circle><circle cx=\"78.8\" cy=\"89\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#0066CC\" stroke-width=\"1\"></circle><circle cx=\"67.2\" cy=\"89\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#0066CC\" stroke-width=\"1\"></circle><circle cx=\"58.3\" cy=\"81.5\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#0066CC\" stroke-width=\"1\"></circle><circle cx=\"56.3\" cy=\"70\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#0066CC\" stroke-width=\"1\"></circle><circle cx=\"62.1\" cy=\"60\" r=\"2\" fill=\"#F3F4F4\" stroke=\"#0066CC\" stroke-width=\"1\"></circle>"
  },
  {
   "slug": "nalfpca",
   "title": "Network-Assisted Localized FPCA",
   "kind": "Manuscript",
   "meta": "In preparation",
   "glyph": "modules",
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
   ],
   "card": {
    "label": "manuscript · in preparation",
    "title": "Network-Assisted Localized FPCA",
    "body": "Eigenfunctions of brain activity that are sparse and smooth along a functional connectivity network rather than along anatomical distance. Applied to HCP working-memory MEG and longitudinal ADNI fMRI. With Kehui Chen.",
    "tags": [
     "FPCA",
     "MEG · fMRI",
     "graph penalty"
    ],
    "caption": "eigenfunctions φ1 to φ3, each localized on the network"
   },
   "plate": "<line x1=\"54.5\" y1=\"59.7\" x2=\"51.3\" y2=\"57.6\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"54.5\" y1=\"59.7\" x2=\"54.9\" y2=\"64.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"54.5\" y1=\"59.7\" x2=\"60.4\" y2=\"60.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"60.5\" y1=\"48.2\" x2=\"59.3\" y2=\"49.7\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"60.5\" y1=\"48.2\" x2=\"55.7\" y2=\"45.7\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"60.5\" y1=\"48.2\" x2=\"55.8\" y2=\"43.1\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"62.6\" y1=\"28.4\" x2=\"59.9\" y2=\"32.8\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"62.6\" y1=\"28.4\" x2=\"68.4\" y2=\"35.7\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"62.6\" y1=\"28.4\" x2=\"65.5\" y2=\"39.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"48.9\" y1=\"57.8\" x2=\"51.3\" y2=\"57.6\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"48.9\" y1=\"57.8\" x2=\"46.4\" y2=\"55.6\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"48.9\" y1=\"57.8\" x2=\"54.5\" y2=\"59.7\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"31.2\" y1=\"69\" x2=\"30.7\" y2=\"70.5\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"31.2\" y1=\"69\" x2=\"40.8\" y2=\"75.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"31.2\" y1=\"69\" x2=\"43.9\" y2=\"65.5\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"64.5\" y1=\"42.3\" x2=\"64.6\" y2=\"40.9\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"64.5\" y1=\"42.3\" x2=\"65.5\" y2=\"39.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"64.5\" y1=\"42.3\" x2=\"70.6\" y2=\"43.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"54.9\" y1=\"64.3\" x2=\"60.4\" y2=\"60.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"54.9\" y1=\"64.3\" x2=\"51.3\" y2=\"57.6\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"40.8\" y1=\"75.3\" x2=\"43.9\" y2=\"65.5\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"40.8\" y1=\"75.3\" x2=\"30.7\" y2=\"70.5\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"46.4\" y1=\"55.6\" x2=\"51.3\" y2=\"57.6\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"46.4\" y1=\"55.6\" x2=\"39.8\" y2=\"59\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"43.9\" y1=\"65.5\" x2=\"39.8\" y2=\"59\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"43.9\" y1=\"65.5\" x2=\"48.9\" y2=\"57.8\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"64.6\" y1=\"40.9\" x2=\"65.5\" y2=\"39.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"64.6\" y1=\"40.9\" x2=\"70.6\" y2=\"43.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"38.9\" y1=\"55.3\" x2=\"39.8\" y2=\"59\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"38.9\" y1=\"55.3\" x2=\"46.4\" y2=\"55.6\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"38.9\" y1=\"55.3\" x2=\"33.1\" y2=\"49.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"28.5\" y1=\"39.5\" x2=\"33.1\" y2=\"49.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"28.5\" y1=\"39.5\" x2=\"43.4\" y2=\"38.1\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"28.5\" y1=\"39.5\" x2=\"44.2\" y2=\"32.5\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"59.3\" y1=\"49.7\" x2=\"55.7\" y2=\"45.7\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"59.3\" y1=\"49.7\" x2=\"55.8\" y2=\"43.1\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"68.4\" y1=\"35.7\" x2=\"65.5\" y2=\"39.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"68.4\" y1=\"35.7\" x2=\"64.6\" y2=\"40.9\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"68.4\" y1=\"35.7\" x2=\"64.5\" y2=\"42.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"60.4\" y1=\"60.3\" x2=\"62.6\" y2=\"66.1\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"44.2\" y1=\"32.5\" x2=\"43.4\" y2=\"38.1\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"44.2\" y1=\"32.5\" x2=\"48.1\" y2=\"40.6\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"44.2\" y1=\"32.5\" x2=\"55.8\" y2=\"43.1\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"70.6\" y1=\"43.2\" x2=\"65.5\" y2=\"39.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"62.6\" y1=\"66.1\" x2=\"68\" y2=\"71.8\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"62.6\" y1=\"66.1\" x2=\"54.9\" y2=\"64.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"30.7\" y1=\"70.5\" x2=\"43.9\" y2=\"65.5\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"48.1\" y1=\"40.6\" x2=\"43.4\" y2=\"38.1\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"48.1\" y1=\"40.6\" x2=\"55.8\" y2=\"43.1\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"43.4\" y1=\"38.1\" x2=\"55.8\" y2=\"43.1\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"59.9\" y1=\"32.8\" x2=\"65.5\" y2=\"39.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"59.9\" y1=\"32.8\" x2=\"68.4\" y2=\"35.7\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"55.8\" y1=\"43.1\" x2=\"55.7\" y2=\"45.7\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"33.1\" y1=\"49.2\" x2=\"39.8\" y2=\"59\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"68\" y1=\"71.8\" x2=\"60.4\" y2=\"60.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"68\" y1=\"71.8\" x2=\"54.9\" y2=\"64.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"70.6\" y1=\"43.2\" x2=\"79\" y2=\"39.8\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"79\" y1=\"39.8\" x2=\"87.8\" y2=\"37.8\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"87.8\" y1=\"37.8\" x2=\"96\" y2=\"40.7\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"68\" y1=\"71.8\" x2=\"74.5\" y2=\"78\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"74.5\" y1=\"78\" x2=\"80.8\" y2=\"84.4\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"80.8\" y1=\"84.4\" x2=\"85.4\" y2=\"92.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"68\" y1=\"71.8\" x2=\"71.1\" y2=\"80.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"71.1\" y1=\"80.3\" x2=\"70.4\" y2=\"89.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"70.4\" y1=\"89.3\" x2=\"76.3\" y2=\"96\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"30.7\" y1=\"70.5\" x2=\"23.4\" y2=\"75.9\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"23.4\" y1=\"75.9\" x2=\"18.3\" y2=\"83.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"18.3\" y1=\"83.3\" x2=\"14.2\" y2=\"91.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"30.7\" y1=\"70.5\" x2=\"23.9\" y2=\"76.4\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"23.9\" y1=\"76.4\" x2=\"17\" y2=\"82.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"28.5\" y1=\"39.5\" x2=\"19.6\" y2=\"40.5\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"19.6\" y1=\"40.5\" x2=\"11\" y2=\"37.8\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"11\" y1=\"37.8\" x2=\"4\" y2=\"35.1\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"28.5\" y1=\"39.5\" x2=\"19.8\" y2=\"37.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"19.8\" y1=\"37.2\" x2=\"12.1\" y2=\"32.6\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"12.1\" y1=\"32.6\" x2=\"5.7\" y2=\"26.3\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"44.2\" y1=\"32.5\" x2=\"40.1\" y2=\"24.5\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"40.1\" y1=\"24.5\" x2=\"42.4\" y2=\"15.8\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"42.4\" y1=\"15.8\" x2=\"42.2\" y2=\"6.8\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"62.6\" y1=\"28.4\" x2=\"68.4\" y2=\"21.4\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"68.4\" y1=\"21.4\" x2=\"73.6\" y2=\"14.1\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"73.6\" y1=\"14.1\" x2=\"74.1\" y2=\"5.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"68.4\" y1=\"35.7\" x2=\"74.8\" y2=\"29.4\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"74.8\" y1=\"29.4\" x2=\"80.8\" y2=\"22.7\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><line x1=\"80.8\" y1=\"22.7\" x2=\"87\" y2=\"16.2\" stroke=\"#D5D8DA\" stroke-width=\"0.7\"></line><circle cx=\"54.5\" cy=\"59.7\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"60.5\" cy=\"48.2\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"62.6\" cy=\"28.4\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"48.9\" cy=\"57.8\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"31.2\" cy=\"69\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"64.5\" cy=\"42.3\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"54.9\" cy=\"64.3\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"40.8\" cy=\"75.3\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"43.9\" cy=\"65.5\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"64.6\" cy=\"40.9\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"59.3\" cy=\"49.7\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"68.4\" cy=\"35.7\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"60.4\" cy=\"60.3\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"70.6\" cy=\"43.2\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"51.3\" cy=\"57.6\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"62.6\" cy=\"66.1\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"30.7\" cy=\"70.5\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"48.1\" cy=\"40.6\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"59.9\" cy=\"32.8\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"65.5\" cy=\"39.2\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"55.8\" cy=\"43.1\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"68\" cy=\"71.8\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"55.7\" cy=\"45.7\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"79\" cy=\"39.8\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"87.8\" cy=\"37.8\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"96\" cy=\"40.7\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"74.5\" cy=\"78\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"80.8\" cy=\"84.4\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"85.4\" cy=\"92.2\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"71.1\" cy=\"80.3\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"70.4\" cy=\"89.3\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"76.3\" cy=\"96\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"23.4\" cy=\"75.9\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"18.3\" cy=\"83.3\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"14.2\" cy=\"91.3\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"23.9\" cy=\"76.4\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"17\" cy=\"82.2\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"19.6\" cy=\"40.5\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"11\" cy=\"37.8\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"4\" cy=\"35.1\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"19.8\" cy=\"37.2\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"12.1\" cy=\"32.6\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"5.7\" cy=\"26.3\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"40.1\" cy=\"24.5\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"42.4\" cy=\"15.8\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"42.2\" cy=\"6.8\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"68.4\" cy=\"21.4\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"73.6\" cy=\"14.1\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"74.1\" cy=\"5.2\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"74.8\" cy=\"29.4\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"80.8\" cy=\"22.7\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"87\" cy=\"16.2\" r=\"1.1\" fill=\"#C3C6C8\" stroke=\"none\"></circle><circle cx=\"46.4\" cy=\"55.6\" r=\"2.01244\" fill=\"#0066CC\" stroke=\"none\"></circle><circle cx=\"38.9\" cy=\"55.3\" r=\"1.89285\" fill=\"#0066CC\" stroke=\"none\"></circle><circle cx=\"28.5\" cy=\"39.5\" r=\"2.15645\" fill=\"#0066CC\" stroke=\"none\"></circle><circle cx=\"44.2\" cy=\"32.5\" r=\"1.93948\" fill=\"#0066CC\" stroke=\"none\"></circle><circle cx=\"39.8\" cy=\"59\" r=\"1.85986\" fill=\"#0066CC\" stroke=\"none\"></circle><circle cx=\"43.4\" cy=\"38.1\" r=\"2.16143\" fill=\"#0066CC\" stroke=\"none\"></circle><circle cx=\"33.1\" cy=\"49.2\" r=\"2.62616\" fill=\"#0066CC\" stroke=\"none\"></circle>"
  },
  {
   "slug": "pkqr",
   "title": "Penalized Kernel Quantile Regression",
   "kind": "Published",
   "meta": "2022 · JSPI",
   "glyph": "coef",
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
   ],
   "card": {
    "label": "published · 2022, JSPI",
    "title": "Penalized Kernel Quantile Regression",
    "body": "Identifies the partially linear structure of a varying coefficient quantile model, with a proximal ADMM algorithm and a plug-in bandwidth rule from high-dimensional kernel theory.",
    "tags": [
     "ADMM",
     "quantile",
     "high-dim"
    ],
    "caption": "conditional quantiles with a sliding kernel window"
   },
   "plate": "<line x1=\"8\" y1=\"90\" x2=\"92\" y2=\"90\" stroke=\"#C3C6C8\"></line><line x1=\"8\" y1=\"90\" x2=\"8\" y2=\"10\" stroke=\"#C3C6C8\"></line><line x1=\"34\" y1=\"90\" x2=\"34\" y2=\"93\" stroke=\"#C3C6C8\"></line><line x1=\"62\" y1=\"90\" x2=\"62\" y2=\"93\" stroke=\"#C3C6C8\"></line><path d=\"M10 40 C24 14 38 18 50 34 S74 60 90 30\" stroke=\"#0066CC\"></path><path d=\"M10 58 L90 58\" stroke=\"#1A1C1D\"></path><path d=\"M10 74 L90 74\" stroke=\"#C3C6C8\"></path>"
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
   ],
   "card": {
    "label": "published · 2023, Scientific Reports",
    "title": "Methylation and ADHD",
    "body": "First co-author. Prenatal sulfur dioxide exposure, genome-wide DNA methylation at ages 2 and 6, and ADHD rating scales at ages 4, 6 and 8 across 329 mother–child pairs.",
    "tags": [
     "EWAS",
     "cohort",
     "R"
    ],
    "caption": "Manhattan plot; candidate-gene CpGs in green"
   },
   "plate": "<line x1=\"8\" y1=\"88\" x2=\"92\" y2=\"88\" stroke=\"#C3C6C8\"></line><line x1=\"8\" y1=\"38\" x2=\"92\" y2=\"38\" stroke=\"#C3C6C8\" stroke-dasharray=\"2 4\"></line><circle cx=\"13.7526\" cy=\"72.9953\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"11.6157\" cy=\"68.6821\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"15.555\" cy=\"81.0136\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"15.3132\" cy=\"80.642\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"11.3187\" cy=\"79.4764\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"11.7711\" cy=\"81.9966\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"14.6084\" cy=\"80.8966\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"12.8975\" cy=\"78.0805\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"16.3332\" cy=\"67.8568\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"24.3718\" cy=\"78.4966\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"29.2982\" cy=\"59.3859\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"23.4617\" cy=\"76.5827\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"22.2262\" cy=\"75.7552\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"27.9371\" cy=\"76.4701\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"22.5362\" cy=\"67.8306\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"24.1654\" cy=\"74.8979\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"25.6558\" cy=\"79.7926\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"22.7506\" cy=\"82.2483\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"36.7834\" cy=\"73.8587\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"35.9773\" cy=\"79.0391\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"34.8521\" cy=\"76.8871\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"36.9415\" cy=\"61.9993\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"33.0748\" cy=\"69.8364\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"38.4387\" cy=\"76.8478\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"37.2003\" cy=\"75.4044\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"32.0036\" cy=\"48.6256\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"34.554\" cy=\"83.6652\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"45.1562\" cy=\"76.5428\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"41.3333\" cy=\"73.1318\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"45.8707\" cy=\"64.7452\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"48.4416\" cy=\"76.1853\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"46.0521\" cy=\"65.5443\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"45.9291\" cy=\"60.0496\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"49.0298\" cy=\"77.238\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"45.0298\" cy=\"81.6376\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"46.9627\" cy=\"80.0536\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"56.5006\" cy=\"59.8724\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"53.4191\" cy=\"82.9527\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"54.2792\" cy=\"82.6415\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"54.9244\" cy=\"81.5776\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"52.4284\" cy=\"80.6403\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"57.53\" cy=\"80.9585\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"52.0994\" cy=\"83.806\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"58.4071\" cy=\"71.0555\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"51.6849\" cy=\"68.4138\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"68.5088\" cy=\"78.8476\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"67.9639\" cy=\"77.1052\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"64.53\" cy=\"76.0781\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"64.0496\" cy=\"59.5809\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"62.2828\" cy=\"62.2505\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"62.4979\" cy=\"82.9279\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"65.1222\" cy=\"74.5841\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"66.0075\" cy=\"83.9058\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"64.561\" cy=\"82.8263\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"74.1387\" cy=\"54.595\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"76.8692\" cy=\"70.98\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"75.3817\" cy=\"69.568\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"71.4589\" cy=\"70.8525\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"78.646\" cy=\"79.0419\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"77.7819\" cy=\"57.9816\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"74.3352\" cy=\"79.1058\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"76.3915\" cy=\"80.3959\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"71.5291\" cy=\"75.8883\" r=\"1.15\" fill=\"#1A1C1D\" stroke=\"none\"></circle><circle cx=\"82.3796\" cy=\"80.3468\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"83.8905\" cy=\"83.7344\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"82.2858\" cy=\"83.9089\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"81.8624\" cy=\"82.0654\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"88.4318\" cy=\"81.7666\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"86.2196\" cy=\"78.1008\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"83.9528\" cy=\"76.0341\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"84.0954\" cy=\"65.887\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"89.4414\" cy=\"66.3716\" r=\"1.15\" fill=\"#9AA0A5\" stroke=\"none\"></circle><circle cx=\"34\" cy=\"24\" r=\"1.9\" fill=\"#0066CC\" stroke=\"none\"></circle><circle cx=\"36.5\" cy=\"30\" r=\"1.9\" fill=\"#0066CC\" stroke=\"none\"></circle><circle cx=\"65\" cy=\"17\" r=\"1.9\" fill=\"#0066CC\" stroke=\"none\"></circle><circle cx=\"63\" cy=\"27\" r=\"1.9\" fill=\"#0066CC\" stroke=\"none\"></circle><circle cx=\"67.5\" cy=\"33\" r=\"1.9\" fill=\"#0066CC\" stroke=\"none\"></circle>"
  },
  {
   "slug": "anomaly",
   "title": "Anomaly Detection in Cyber-Physical Systems",
   "kind": "Published",
   "meta": "2019 · MileTS19",
   "glyph": "density",
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
   ],
   "card": {
    "label": "published · 2019, MileTS19",
    "title": "Anomaly Detection in Cyber-Physical Systems",
    "body": "Contextual anomalies in the SWaT water-treatment data, found by measuring Kullback–Leibler divergence between sliding-window error distributions from RNN and MDN classifiers.",
    "tags": [
     "RNN",
     "MDN",
     "KL divergence"
    ],
    "caption": "sensor prediction errors, KL divergence and attacks"
   },
   "plate": "<line x1=\"8\" y1=\"48\" x2=\"92\" y2=\"48\" stroke=\"#C3C6C8\"></line><path d=\"M12 48 C25 48 30.2 14 38 14 S51 48 64 48\" stroke=\"#1A1C1D\"></path><path d=\"M30 48 C45 48 51 22 60 22 S75 48 90 48\" stroke=\"#0066CC\"></path><rect x=\"14\" y=\"60\" width=\"24\" height=\"30\" fill=\"#E1E6EC\" stroke=\"none\"></rect><rect x=\"54\" y=\"60\" width=\"24\" height=\"30\" fill=\"none\" stroke=\"#0066CC\" stroke-dasharray=\"3 4\"></rect><path d=\"M8 76 L14 72 L20 79 L26 71 L32 78 L38 73 L44 77 L50 72 L56 66 L61 86 L66 63 L71 84 L76 69 L82 77 L92 74\" stroke=\"#1A1C1D\"></path>"
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
   "title": "Network assisted localized functional principal component analysis for brain MEG data",
   "authors": "Jinwoo Cho, Kehui Chen",
   "venue": "",
   "url": "#/p/nalfpca",
   "link": "Project"
  },
  {
   "group": "In preparation",
   "selected": true,
   "title": "A Stochastic Actor-Oriented Model for the Longitudinal Analysis of Cognitive Social Structures",
   "authors": "Jinwoo Cho, Nynke Niezink",
   "venue": "",
   "url": "#/p/three-way",
   "link": "Project"
  },
  {
   "group": "In preparation",
   "title": "Subgroup Identification and Inference in Nationally Representative Survey Data",
   "authors": "Jinwoo Cho, Eun Ryung Lee, Seyoung Park, G. Hong",
   "venue": "",
   "url": "",
   "link": ""
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
   "title": "A novel method for biological age assessment utilizing hospitalization risk of cardiovascular disease",
   "authors": "J. Oh, Jinwoo Cho, Yun-Chul Hong, H. J. Yoon, E. Ha — Oh and Cho contributed equally",
   "venue": "BMC Cardiovascular Disorders, 2026 (in press)",
   "url": "",
   "link": ""
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
   "authors": "Jinwoo Cho, Shahroz Tariq, Sangyup Lee, Young Geun Kim, Jeong-Han Yun, Jonguk Kim, Hyoung Chun Kim, Simon S. Woo",
   "venue": "5th Workshop on Mining and Learning from Time Series (MileTS19), Anchorage, Alaska, 2019",
   "url": "",
   "link": ""
  }
 ],
 "news": [
  {
   "date": "Aug 2026",
   "text": "I presented “Modeling Longitudinal Three-way Network Data” at JSM 2026 in Boston."
  },
  {
   "date": "Jun 2026",
   "text": "I gave a talk on stochastic actor-oriented modeling for cognitive social structures at the INSNA Sunbelt Conference, Daytona Beach."
  },
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
     "org": "Department of Information Statistics, Korea National Open University",
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
     "year": "Aug 2026",
     "title": "Modeling Longitudinal Three-way Network Data",
     "org": "Joint Statistical Meetings (JSM) 2026, Boston, Massachusetts",
     "notes": []
    },
    {
     "year": "Jun 2026",
     "title": "Stochastic Actor-Oriented Modeling for Cognitive Social Structures",
     "org": "Sunbelt Social Networks Conference (INSNA) 2026, Daytona Beach, Florida",
     "notes": []
    },
    {
     "year": "May 2026",
     "title": "Beyond Objective Networks: Analyzing Subjective Social Structures via the Three-way SAOM",
     "org": "Hanyang University, Department of Automotive Engineering (IRCV Lab), Seoul — invited talk",
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
