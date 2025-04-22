# 使用附加任务进行注释增强

## 描述
对特定聚类执行额外的分析，并带有自定义的分析任务。此函数通过允许使用大型语言模型对聚类特定的生物学问题进行集中研究，扩展了基本注释。

## 用法
```r
runCASSIA_annottaionboost_additional_task(
    full_result_path,
    marker,
    output_name,
    cluster_name,
    major_cluster_info,
    num_iterations = 5,
    model = "anthropic/claude-3.5-sonnet",
    additional_task
)
```

## 参数
* `full_result_path`: 字符串。先前分析的完整结果 CSV 文件的路径。应包含带有 "_full.csv" 后缀的输出名称。

* `marker`: 对象。包含分析中使用的未处理标记数据。

* `output_name`: 字符串。此函数生成的输出文件的名称。

* `cluster_name`: 字符串。要分析的特定聚类的名称（例如，"cd8-positive, alpha-beta t cell"）。

* `major_cluster_info`: 字符串。有关正在研究的组织或系统的一般信息（例如，"Human Large Intestine"）。

* `num_iterations`: 整数。运行分析的迭代次数。默认为 5。

* `model`: 字符串。指定要使用的大型语言模型。目前仅支持 "anthropic/claude-3.5-sonnet"。

* `additional_task`: 字符串。要对聚类执行的自定义分析任务（例如，"推断此 T 细胞聚类的状态"）。

## 详情
此函数通过使用大型语言模型执行专门的分析任务来增强聚类注释。它对于研究有关单个聚类的特定生物学问题特别有用。该函数将标记数据与自定义分析目标相结合，以提供对聚类特征的更深入见解。

## 注意
这种分析方法的性能尚未经过广泛的基准测试。结果应谨慎解释，并通过其他方法进行验证。

## 示例
```r
runCASSIA_annottaionboost_additional_task(
    full_result_path = "output_name_full.csv",
    marker = markers_unprocessed,
    output_name = "T_cell_state",
    cluster_name = "cd8-positive, alpha-beta t cell",
    major_cluster_info = "Human Large Intestine",
    num_iterations = 5,
    model = "anthropic/claude-3.5-sonnet",
    additional_task = "推断此 T 细胞聚类的状态"
)
```