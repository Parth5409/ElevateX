# backend/app/services/ai_service.py

# This service handles the core AI logic using LangChain and Google Gemini.
# It implements the "JD Matchmaker" and "Skill-Gap Feedback" features.
# It performs:
# - JD text extraction and analysis
# - Student profile retrieval and comparison
# - LLM prompt execution for ranking and feedback generation

from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings

class AIService:
    def __init__(self):
        # We initialize the model, but keep it unused in the mock implementation
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash", 
            google_api_key=settings.GOOGLE_API_KEY
        )
        # --------------------------------------------------------------------------
        # REAL RAG INTIALIZATION (COMMENTED AS PER IMPLEMENTATION PLAN)
        # --------------------------------------------------------------------------
        # from langchain_chroma import Chroma
        # from langchain_google_genai import GoogleGenerativeAIEmbeddings
        # 
        # self.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        # self.vector_store = Chroma(
        #     embedding_function=self.embeddings, 
        #     persist_directory="./chroma_db"
        # )
        # --------------------------------------------------------------------------

    async def match_jd(self, jd_text: str):
        """
        Mock response for frontend development. Returns static list of matched students.
        """
        # MOCK IMPLEMENTATION
        return {
            "status": "success",
            "matches": [
                {
                    "user_id": "mock-student-id-123",
                    "name": "Jane Doe",
                    "match_score": 92,
                    "rationale": "Strong background in React and FastAPI, closely matching the JD requirements."
                },
                {
                    "user_id": "mock-student-id-456",
                    "name": "John Smith",
                    "match_score": 75,
                    "rationale": "Good fundamental skills, missing some specific framework experience."
                }
            ]
        }
        
        # --------------------------------------------------------------------------
        # REAL RAG MATCHING PIPELINE (COMMENTED FOR FUTURE ACTIVATION)
        # --------------------------------------------------------------------------
        # """
        # Real Implementation Logic:
        # 1. Query ChromaDB for top K student profiles closest to JD embeddings
        # 2. Extract profile JSONs from retrieved documents
        # 3. Construct a zero-shot prompt with the JD and the Student Profiles
        # 4. Use LLM Structured Output to guarantee JSON matching schema
        # """
        # from langchain_core.prompts import PromptTemplate
        # from pydantic import BaseModel, Field
        # 
        # class MatchResult(BaseModel):
        #     user_id: str = Field(description="The unique user ID of the student")
        #     name: str = Field(description="The name of the student")
        #     match_score: int = Field(description="Match score out of 100")
        #     rationale: str = Field(description="1-sentence explanation of the score")
        #
        # class MatchList(BaseModel):
        #     matches: list[MatchResult]
        # 
        # # Retrieve top 10 relevant students
        # docs = self.vector_store.similarity_search(jd_text, k=10)
        # context = "\n\n".join([d.page_content for d in docs])
        # 
        # prompt = PromptTemplate.from_template(
        #     "You are an expert HR Matchmaker. Here is a Job Description:\n{jd}\n\n"
        #     "Here are the top candidate profiles in our database:\n{profiles}\n\n"
        #     "Rank them out of 100 on how well they match the job."
        # )
        # 
        # # Bind schema
        # structured_llm = self.model.with_structured_output(MatchList)
        # chain = prompt | structured_llm
        # 
        # result = await chain.ainvoke({"jd": jd_text, "profiles": context})
        # return {"status": "success", "matches": [m.dict() for m in result.matches]}
        # --------------------------------------------------------------------------


    async def generate_feedback(self, student_profile: dict, jd_text: str):
        """
        Mock response for frontend development. Returns static feedback.
        """
        # MOCK IMPLEMENTATION
        return {
            "status": "success",
            "feedback": {
                "missing_skills": ["AWS", "GraphQL", "Docker"],
                "action_plan": "Consider taking a cloud certification and building a small GraphQL API containerized with Docker."
            }
        }
        
        # --------------------------------------------------------------------------
        # REAL RAG FEEDBACK PIPELINE (COMMENTED FOR FUTURE ACTIVATION)
        # --------------------------------------------------------------------------
        # """
        # Real Implementation Logic:
        # 1. Take specific student profile and target JD
        # 2. Prompt Gemini to produce missing skills and a short action plan using structured output
        # """
        # from pydantic import BaseModel, Field
        # from langchain_core.prompts import PromptTemplate
        # 
        # class FeedbackResult(BaseModel):
        #     missing_skills: list[str] = Field(description="Up to 3 missing technical skills.")
        #     action_plan: str = Field(description="1-2 sentences of actionable advice.")
        # 
        # prompt = PromptTemplate.from_template(
        #     "Compare this Student Profile:\n{profile}\n\n"
        #     "To this Job Description:\n{jd}\n\n"
        #     "Identify the critical missing skills and give a brief action plan."
        # )
        # 
        # structured_llm = self.model.with_structured_output(FeedbackResult)
        # chain = prompt | structured_llm
        # 
        # result = await chain.ainvoke({
        #     "jd": jd_text, 
        #     "profile": str(student_profile)
        # })
        # return {"status": "success", "feedback": result.dict()}
        # --------------------------------------------------------------------------

    # --------------------------------------------------------------------------
    # HELPER FUNCTION FOR PHASE 1 (VECTOR SYNC) (COMMENTED)
    # --------------------------------------------------------------------------
    # async def upsert_student_embedding(self, profile: dict):
    #     """Call this when a student updates their profile to sync with ChromaDB"""
    #     from langchain_core.documents import Document
    #     
    #     doc_text = f"Student {profile.get('name')} in {profile.get('branch')}. Skills: {', '.join(profile.get('skills', []))}."
    #     doc = Document(page_content=doc_text, metadata={"user_id": str(profile.get("user_id"))})
    #     
    #     # Remove old docs for this user
    #     # self.vector_store._collection.delete(where={"user_id": str(profile.get("user_id"))})
    #     # Add new
    #     # self.vector_store.add_documents([doc])
    # --------------------------------------------------------------------------

ai_service = AIService()
