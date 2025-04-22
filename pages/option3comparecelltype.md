# Determining Cell Type

This function allows you to determine which cell type is most likely to be the true cell type of a cluster, utilizing multiple LLMs. Under default settings, 3 state-of-the-art LLMs are used to score the candidate cell types based on the marker genes.


## Function Parameters

```r
compareCelltypes(
    tissue,        # The tissue type being analyzed (e.g., "large intestine")
    celltypes,     # Vector of cell types to compare (e.g., c("Plasma Cells", "IgA-secreting Plasma Cells"))
    marker,        # String of marker genes separated by commas
    species,       # Species of origin ("human" or "mouse")
    output_file,   # Name for the output file (e.g., "plasma_cell_subtype")
    model_list     # Optional: List of LLM models to use (has default values)
)
```

## Parameter Details

1. **tissue**: 
   - Type: character string
   - Specifies the tissue source of your data
   - Example: "large intestine", "small intestine", "brain"

2. **celltypes**: 
   - Type: character vector
   - List of cell types you want to compare
   - Maximum recommended: 4-5 cell types for optimal results
   - Example: `c("Plasma Cells", "IgA-secreting Plasma Cells", "IgG-secreting Plasma Cells")`

3. **marker**: 
   - Type: character string
   - Comma-separated list of marker genes
   - Can include both up and down-regulated markers
   - Example: "IGLL5, IGLV6-57, JCHAIN, FAM92B, IGLC3"

4. **species**: 
   - Type: character string
   - Options: "human" or "mouse"
   - Specifies the species origin of your data

5. **output_file**: 
   - Type: character string
   - Name for the output file (without extension)
   - Example: "plasma_cell_subtype"

6. **model_list**: 
   - Type: vector of strings
   - Optional parameter
   - Default models (if none provided):
     ```r
     model_list = c(
         "anthropic/claude-3.5-sonnet",  # Anthropic's latest model
         "openai/o1-mini",              # OpenAI's model
         "google/gemini-pro-1.5"        # Google's model
     )
     ```
   - These default models are selected as they represent state-of-the-art LLMs



## Output Format

1. **Console Output**:
   - Similarity scores from each LLM for each cell type
   - Consensus results (if reached)
   - Warning messages (if any)

2. **Output File** (saved as "[output_file].txt"):
   - Detailed comparison results from each LLM
   - Marker gene analysis
   - Final consensus (if reached)

## Interpretation Guide

### High Confidence Result
- A high confidence result is obtained when ALL LLMs give a score above 80% for the same cell type
- This indicates a clear, unambiguous cell type identification

### No Consensus Reached
If no clear consensus is reached, consider these possible scenarios:

1. **Low Quality Cluster**
   - Symptom: Inconsistent or low scores across LLMs
   - Solution: Increase the number of marker genes in your analysis

2. **Mixed Cluster**
   - Symptom: Different LLMs strongly favor different cell types
   - Solution: Perform subclustering to separate potential distinct populations

3. **Last Resort**
   - If issues persist after trying the above solutions
   - Consult domain experts for manual review