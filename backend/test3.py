import asyncio
from services.agy_runner import run_tailor_pipeline

async def test():
    try:
        await run_tailor_pipeline("Job description for test", "Custom instruction test")
        print("Success")
    except Exception as e:
        print(f"FAILED: {e}")

asyncio.run(test())
