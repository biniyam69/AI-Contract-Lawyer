import ragas
import trulens_eval
from langchain_community.vectorstores import qdrant
from langchain_community.document_loaders import DirectoryLoader
from chatbot_chain import setup_chatbot_chain
from langchain_core.runnables import RunnableParallel, RunnablePassthrough
from trulens_eval import trulens_eval
from ragas.langchain.evalchain import RagasEvaluatorChain
from ragas.metrics import (
    faithfullness,
    answer_correctness,
    answer_similarity,
    context_precision,
    context_utilization,
    answer_usefulness,
    answer_relevancy,
    context_relevancy,
    context_recall
)



def sythetic_data_ragas():
    pass

def eval_tru():
    pass

def eval_ragas():
    faithfullneschain = RagasEvaluatorChain(metric=faithfullness)
    answer_rel = RagasEvaluatorChain(metric=answer_relevancy)
    context_rel = RagasEvaluatorChain(metric=context_relevancy)
    context_rec = RagasEvaluatorChain(metric=context_recall)
    context_prec = RagasEvaluatorChain(metric=context_precision)
    answer_corr -= RagasEvaluatorChain(metric=answer_correctness)

def eval_monte_carlo():
    pass

def eval_elo():
    pass