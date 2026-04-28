# Cognexis

<div align="center">

**Compute-Adaptive Recurrent-Depth Large Language Models**

*A family of decoder-only LLMs that separate reasoning depth from parameter count through recurrent computation*

[![Spec](https://img.shields.io/badge/Spec-28_docs-green.svg)](https://github.com/cognexis/cognexis-spec)
[![Paper](https://img.shields.io/badge/Whitepaper-PDF-red.svg)](cognexis-spec/cognexis_white_paper.md)

</div>

---

## Overview

Cognexis is a family of decoder-only large language models (LLMs) that separate **reasoning depth** from **parameter count** through recurrent computation. Instead of scaling performance by stacking ever-deeper transformer layers, Cognexis reuses a shared recurrent reasoning core multiple times at inference. This design allows the model to allocate more computation to difficult inputs while keeping the number of stored parameters constant.

### Key Innovation

Traditional LLMs couple reasoning depth to storage footprint:

```
Traditional: More Depth = More Parameters = More Memory
Cognexis:    More Depth = More Loops (same Parameters)
```

With Cognexis, you get:
- **Single checkpoint** serving multiple quality/latency budgets
- **Adaptive loop scheduling** that allocates computation where needed
- **Effective depth** that scales with compute, not parameters

---

## Architecture

Cognexis uses a three-stage **Prelude–Recurrent–Coda** architecture:

```
Input Tokens
    │
    ▼
┌─────────────────────┐
│     Prelude        │  ← Standard transformer blocks (unique weights)
│  (L_p blocks)     │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  Recurrent Core    │  ← Shared transformer block (repeated N times)
│  (shared block)  │
│    ↓             │
│    ↓  N loops   │
│    ↓             │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│      Coda         │  ← Final transformer blocks (unique weights)
│  (L_c blocks)    │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│    LM Head        │  ← Vocabulary projection (tied to embeddings)
└─────────────────────┘
    │
    ▼
   Logits
```

### Effective Depth Formula

```
effective_depth = num_prelude_blocks + (loop_count × num_recurrent_blocks) + num_coda_blocks
```

The recurrent core uses **one shared block** whose weights are reused across all loop iterations. Increasing the loop count increases effective depth without adding parameters.

---

## Model Configurations

Cognexis supports multiple parameter scales:

| Model | Hidden Size | Attention Heads | Prelude | Coda | Max Training Loops | Parameters |
|-------|-----------|--------------|---------|-----|------------------|-----------|
| **Cognexis-8B** | 4096 | 32 | 8 | 8 | 12 | ~8B |
| **Cognexis-64B** | 8192 | 64 | 10 | 10 | 16 | ~64B |
| **Cognexis-256B** | 12288 | 96 | 12 | 12 | 20 | ~256B |
| **Cognexis-1.28T** | 16384 | 128 | 16 | 16 | 24 | ~1.28T |

---

## Operating Modes

Cognexis exposes reasoning depth as a runtime parameter with three execution modes:

### Fixed Mode
```python
model.generate(input_ids, loop_budget=8, loop_mode="fixed")
```
Runs a constant number of loops for all requests. Best for benchmarking and deterministic production.

### Adaptive Sequence Mode
```python
model.generate(input_ids, loop_budget=16, loop_mode="adaptive")
```
A scheduler decides when to stop for the entire sequence based on expected marginal gains. The preferred first production mode.

### Adaptive Token Mode
```python
model.generate(input_ids, loop_budget=16, loop_mode="token_adaptive")
```
Each token position may halt independently. More efficient for heterogeneous sequences but requires complex cache management.

---

## Evaluation Metrics

Cognexis introduces specialized metrics for recurrent-depth models:

### Depth Efficiency Index (DEI)
```text
DEI(N) = (M(N) - M(N₀)) / (C(N) - C(N₀))
```
Measures performance gain per additional unit of compute. Higher DEI indicates loops provide good returns.

### Loop Saturation Point (LSP)
The loop count that maximizes DEI — the most efficient reasoning depth.

### Overthinking Threshold (OT)
The smallest loop count where performance begins to decline with further iterations.

---

## Getting Started

### Installation

```bash
git clone https://github.com/cognexis/cognexis.git
cd cognexis
cargo build --release
```

### Quick Inference

```bash
cargo run --release -- example --prompt "The future of AI is" --max_tokens 128 --loops 8
```

### Training

Cognexis uses a **loop curriculum** approach:

1. **Warm-up**: Train with low loop count (N=2)
2. **Randomized loops**: Sample loop count uniformly
3. **Depth expansion**: Gradually increase max loops

See [cognexis-spec/spec13_curriculum.md](cognexis-spec/spec13_curriculum.md) for training details.

---

## Documentation

| Document | Description |
|----------|-------------|
| [White Paper](cognexis-spec/cognexis_white_paper.md) | High-level technical narrative |
| [Specification](cognexis-spec/) | 28-normative engineering documents |
| [Overview](cognexis-spec/spec01_overview.md) | Architecture, invariants, document map |
| [Recurrent Core](cognexis-spec/spec08_recurrent_core.md) | Loop execution and stability |
| [Scheduler](cognexis-spec/spec17_scheduler_design.md) | Adaptive loop decisions |
| [Evaluation](cognexis-spec/spec20_evaluation_metrics.md) | Quality and compute metrics |
| [Implementation](cognexis-spec/spec26_implementation_outline.md) | Rust project structure |

---

## Why Cognexis?

### Traditional LLM Scaling
- Deep = expensive memory footprint
- Can't adjust depth at inference
- Need multiple checkpoints for different budgets

### Cognexis Advantages
- **Single checkpoint** for multiple quality/latency tradeoffs
- **Compute-adaptive**: more loops for hard problems, fewer for easy
- **Token-adaptive**: allocates loops where reasoning is needed
- **Efficient**: depth scales with compute, not parameters

### Use Cases
- Interactive applications needing variable latency
- Cost-sensitive deployments
- Research on compute/quality tradeoffs
- Adaptive reasoning benchmarks

---

## Safety & Monitoring

Cognexis includes safety considerations for recurrent models:

- **Loop Stability**: Hard limits on max loops prevent divergent representations
- **Resource Exhaustion**: Budget enforcement prevents DoS via malicious prompts
- **Timing Side Channels**: Loop randomization available for sensitive settings
- **Safety Filters**: Remain active regardless of loop mode

See [cognexis-spec/spec24_safety_monitoring.md](cognexis-spec/spec24_safety_monitoring.md) for details.

---

## Specification

This project follows the full Cognexis engineering specification, documented across 28 specification documents in [cognexis-spec/](cognexis-spec/). The specification defines:

- Tokenizer contract and special tokens
- Embedding and RoPE position handling
- Causal attention with GQA/MQA support
- Feed-forward networks (SwiGLU)
- Prelude, Recurrent Core, and Coda stages
- Configuration schemas and validation
- Training curricula and distributed execution
- Prefill/decode phases and KV caching
- Adaptive loop scheduling
- Evaluation metrics and experiments

---

## License

See [LICENSE](LICENSE) for details.

---

## Citation

```bibtex
@software{cognexis2024,
  title = {Cognexis: Compute-Adaptive Recurrent-Depth Large Language Models},
  author = {Cognexis Team},
  year = {2024},
  url = {https://cognexis.github.io}
}
```

---

<div align="center">

*Decouple reasoning depth from parameter count*

</div>
