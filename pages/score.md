# 质量评分

质量评分有助于评估细胞类型注释的可靠性。CASSIA 通过 `runCASSIA_score_batch` 函数提供自动评分功能，该函数分析每个注释背后的推理和证据。

## 运行质量评分

### 基本用法
```R
runCASSIA_score_batch(
    input_file = "my_annotation_full.csv",
    output_file = "my_annotation_scored.csv",
    max_workers = 4,
    model = "anthropic/claude-3.5-sonnet",
    provider = "openrouter"
)
```

### 参数详情

- **输入/输出文件**:
   - `input_file`: 完整注释结果的路径（来自 `runCASSIA_batch`）
   - `output_file`: 保存评分结果的位置
   
- **处理参数**:
   - `max_workers`: 并行评分线程的数量
   - 推荐：如果提供商设置为 anthropic，使用的 worker 数量应少于注释步骤，以避免 API 限制

- **模型配置**:
   - 推荐模型: `anthropic/claude-3.5-sonnet`
   - 推荐提供商: `openrouter`

### API 提供商注意事项

#### OpenRouter
- **优点**:
  - 更高的速率限制
  - 易于切换模型
- **设置**:
  ```R
  provider <- "openrouter"
  model <- "anthropic/claude-3.5-sonnet"
  ```

#### Anthropic Direct
- **注意事项**:
  - 新用户有使用限制
  - 可能需要减少 `max_workers`
  - 更适合较小的数据集
- **设置**:
  ```R
  provider <- "anthropic"
  model <- "claude-3-5-sonnet-20241022"
  ```

### 输出格式
评分后的输出文件包含：
- 原始注释数据
- 质量评分（0-100）
- 置信度指标
- 评分的详细推理

### 解读评分

- **90-100**: 高置信度，强有力证据
- **76-89**: 良好置信度，充分证据
- **<75**: 低置信度，需要通过 Annotation Boost Agent 和 Compare Agent 运行

# 报告生成

从您的分析中生成详细报告。此步骤通常在质量评分之后进行。

评分报告包括 CASSIA 的所有输出，包括结构化输出、对话历史和质量评分。

### 从评分结果生成批量报告

```R
runCASSIA_generate_score_report(
  csv_path = "my_annotation_scored.csv",
  output_name = "CASSIA_reports_summary"
)
```

_从 `scored_results.csv` 生成单独的报告和索引页面。_