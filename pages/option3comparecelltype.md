# 确定细胞类型

此函数允许您利用多个大型语言模型（LLMs）确定哪种细胞类型最有可能是聚类的真实细胞类型。在默认设置下，会使用 3 个最先进的 LLM 基于标记基因对候选细胞类型进行评分。

## 函数参数

```r
compareCelltypes(
    tissue,        # 被分析的组织类型（例如，"large intestine"）
    celltypes,     # 要比较的细胞类型向量（例如，c("Plasma Cells", "IgA-secreting Plasma Cells")）
    marker,        # 以逗号分隔的标记基因字符串
    species,       # 来源物种（"human" 或 "mouse"）
    output_file,   # 输出文件的名称（例如，"plasma_cell_subtype"）
    model_list     # 可选：要使用的 LLM 模型列表（有默认值）
)
```

## 参数详情

1. **tissue**: 
   - 类型：字符串
   - 指定数据的组织来源
   - 示例："large intestine"、"small intestine"、"brain"

2. **celltypes**: 
   - 类型：字符向量
   - 您要比较的细胞类型列表
   - 最大推荐：2-5 种细胞类型以获得最佳结果
   - 示例：`c("Plasma Cells", "IgA-secreting Plasma Cells", "IgG-secreting Plasma Cells")`

3. **marker**: 
   - 类型：字符串
   - 以逗号分隔的标记基因列表,即该聚类显著表达的基因
   - 示例："IGLL5, IGLV6-57, JCHAIN, FAM92B, IGLC3"

4. **species**: 
   - 类型：字符串
   - 选项："human" 或 "mouse"
   - 指定数据的物种来源

5. **output_file**: 
   - 类型：字符串
   - 输出文件的名称（不含扩展名）
   - 示例："plasma_cell_subtype"

6. **model_list**: 
   - 类型：字符串向量
   - 可选参数
   - 默认模型（如果未提供）：
     ```r
     model_list = c(
         "anthropic/claude-3.5-sonnet",  # Anthropic 的最新模型
         "openai/o1-mini",              # OpenAI 的模型
         "google/gemini-pro-1.5"        # Google 的模型
     )
     ```
   - 这些默认模型是精选的，因为它们代表了最先进的 LLM



## 输出格式

1. **控制台输出**:
   - 每个 LLM 对每种细胞类型的相似性评分
   - 共识结果（如果达成）
   - 警告消息（如果有）

2. **输出文件**（保存为 "[output_file].txt"）:
   - 每个 LLM 的详细比较结果
   - 标记基因分析
   - 最终共识（如果达成）

## 解释指南

### 高置信度结果
- 当所有 LLM 对同一细胞类型给出超过 80% 的评分时，即获得高置信度结果
- 这表明细胞类型识别清晰、明确

### 未达成共识
如果未达成明确共识，请考虑以下可能情况：

1. **低质量聚类**
   - 症状：LLM 之间评分不一致或评分较低
   - 解决方案：增加分析中的标记基因数量

2. **混合聚类**
   - 症状：不同 LLM 强烈倾向于不同的细胞类型
   - 解决方案：执行亚聚类以分离潜在的不同群体

3. **最后手段**
   - 如果在尝试上述解决方案后问题仍然存在
   - 咨询领域专家进行手动审查