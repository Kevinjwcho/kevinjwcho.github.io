---
layout: page
title: Microbiome
description: Introductory project from SNU
img: assets/img/img2_1.jpg
importance: 4
category: application
---

## Microbiome Data Analysis Tutorial

This is a microbiome data analysis tutorial for the lab that I made.

### Library

The necessary libraries are following. 

```{r}
# BiocManager::install("phyloseq")
library(phyloseq)
library(dplyr)
library(data.table)
library(stringr)
```
### Load .biome data
There are four forms of phyloseq class data.

1. otu_table : OTU count data
2. sample_data : Sample data
3. tax_table : Taxonomy data
4. phy_tree : Phylogentic Tree data


### Generate Phylogenetic Tree

Using the information of Denovo, we can generate the phylogenetic tree.

1. adegenet : A package that includes the function, _fasta2DNAbin_, loading `.fasta` data.
2. ape : This package can generate `Phylogentic Tree`

```{r}
# install.packages("ape")
# install.packages("adegenet")
library(adegenet)
library(ape)
```
Then you can load _fasta_ data.
```{r}
dna <-fasta2DNAbin("F:/work/Microbiome_EDC/HN00117382_Reports/otus_rep.fasta")
class(dna)
dna
```

There are several options to create Tree. You can check from _?dist.dna()_. Importantly, if there is missing value in the distance matrix, you can only use _njs()_ function. Otherwise, _nj()_ can be applicable.

**It takes longer than your thonght, so please save the results.**

```{r}
D <- dist.dna(dna, model = "raw")
length(D)
tre <- nj(D)

D <- dist.dna(dna, model = "TN93")
length(D)
tre <- njs(D)

save(tre, file = "F:/work/Microbiome_EDC/RData/TN93_tre.RData")
```

You can load your results from the following code.
```{r}
load("F:/work/Microbiome_EDC/RData/TN93_tre.RData")
```

You can assign the loaded tree to the phyloseq form data.
```{r}
tre$tip.label <- sapply(strsplit(tre$tip.label, "\t"), function(x)x[1])
phy_tree(data) <- tre
data
```

Lastly, if you want to separate your phyloseq data, do the following.
```{r}
otu <- otu_table(data)
sample_dat <- sample_data(data)
tax <- tax_table(data)
phy_tre <- phy_tree(data)
```

### Managing phyloseq data
You can check the ranking level of taxonomy by *rank_names()* function. 
```{r, results = 'markup'}
rank_names(data)
tax_table(data) %>% colnames
```
And add the label of the ranking.
```{r, results='markup'}
colnames(tax_table(data))<- c("Kingdom", "Phylum", "Class", "Order", "Family", "Genus", "Species")
rank_names(data)
```

### Bar graph

First of all, you need *otu_table* to draw a bar graph to see the abundance of each sample. Besides, since the total count of microbiome for each sample is different, if you want to proportion of OTU through a bar graph, you need to compute the relative frequency of the count. To convert the count value, you can do following.
```{r}
rel_sum <- function(x) round((x/sum(x)))
rel_data = transform_sample_counts(data, rel_sum)
total = median(sample_sums(data))
standf <- function(x, t=total) round(t*(x/sum(x)))
stand_data <- transform_sample_counts(data, standf)
otu_table(data)[1:10, 1:5]
otu_table(rel_data)[1:10, 1:5]
```

You can draw a bar graph using _ggplot2_ package.

```{r}
library(ggplot2)
plot_bar(stand_data, fill = "Phylum")+
  geom_bar(aes(color=Phylum, fill=Phylum), stat="identity", position = "stack")+
  theme(axis.text.x = element_blank())
```
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/img2_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


### Heatmap
If your data has the larger number of taxonomy, it would be better to filter your data in heatmap analysis. The following code is to extract the taxonomy whish has the larger counts than median by 10\%.
```{r}
stand_data_abund <- filter_taxa(stand_data, function(x) sum(x>total*0.1)>0, TRUE)
stand_data_abund
```
When you create a heatmap, the result is following.
```{r, echo = F}
plot_heatmap(stand_data_abund, method = "NMDS", distance = "bray")+theme(axis.text.x = element_blank())
```
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/img2_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


### Alpha diversity

To compute alpha diversity, you can use *estimate_richness()* to obtain Chao1, Shannon, and Simpson.
```{r, results = 'markup'}
estimate_richness(data, measures = "Chao1") %>% head
estimate_richness(data, measures = "Shannon") %>% head
estimate_richness(data, measures = "Simpson") %>% head
```

```{r}
plot_richness(data, measures = c("Chao1", "Shannon"))+theme(axis.text.x = element_blank())
```
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/img2_4.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


### Beta diversity

You can compute beta diversity by *distance()* function. 
```{r, results = 'markup'}
distance(data, method = "unifrac") %>% head
distance(data, method = "wunifrac") %>% head
distance(data, method = "bray") %>% head
distance(data, method = "dpcoa") %>% head

```

Since the beta diversity is a distance matrix, we need to reduce dimension using ordination. Ordinatiom includes methods *NMDS* and *PCoA*. 
```{r, results = 'markup'}
data.ord1 <- ordinate(data, "NMDS", "bray")
data.ord2 <- ordinate(data, "NMDS", "wunifrac")
data.ord3 <- ordinate(data, "PCoA", "bray")
data.ord4 <- ordinate(data, "PCoA", "wunifrac")
```

```{r}
plot_ordination(data, data.ord1, type="samples", title = "Samples", color = "baby_gen")+
  geom_point(size=2)
```

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/img2_5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>