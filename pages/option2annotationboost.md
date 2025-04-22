# Annotation Boost (ValidationPlus)

Annotation Boost is an advanced validation tool that enhances annotation confidence through multiple iterations of analysis. It's particularly useful for:
- Validating low-confidence annotations
- Getting detailed insights into specific cell clusters
- Resolving ambiguous cell type assignments
- Generating comprehensive validation reports

### Required Components

1. **Input Data**:
   - Full results CSV from CASSIA batch analysis
   - Original marker gene file (Seurat output or custom marker file)
   - Cluster context information
   - Specific cluster identifier

2. **Model Configuration**:
   - Recommended: `anthropic/claude-3.5-sonnet` via OpenRouter
   - Alternative models may be used but may provide different levels of detail

### Running Annotation Boost

```R
# Setup parameters
validation_config <- list(
    model = "anthropic/claude-3.5-sonnet",
    provider = "openrouter"
)

# Define cluster information
cluster_info <- "Human PBMC"

#Specify the cluster you want to validate
target_cluster = "CD4+ T cell"

# Run validation
runCASSIA_validatorplus(

    # Required parameters
    full_result_path = "cell_type_analysis_results.csv",
    marker = marker_data,
    cluster_name = target_cluster,
    major_cluster_info = cluster_info,
    output_name = "Cluster1_report",
    num_iterations = 5, # Number of validation rounds

    # Model configuration
    model = validation_config$model,
    provider = validation_config$provider,
)
```

### Parameter Details

   - `full_result_path`: Path to original CASSIA results
   - `marker`: Marker gene data (same as used in initial analysis)
   - `cluster_name`: Target cluster name
   - `major_cluster_info`: Dataset context
   - `num_iterations`: Number of validation rounds (default: 5)


### Troubleshooting

1. **Low Confidence Results**:
   - Increase `num_iterations`
   - Review marker gene quality

3. **Inconsistent Results**:
   - Check marker gene consistency
   - Verify input data quality
   - Consider biological variability