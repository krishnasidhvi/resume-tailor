import asyncio

async def test():
    try:
        process = await asyncio.create_subprocess_exec(
            "cmd", "/c", "echo hello",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT
        )
        await process.wait()
        print("Success")
    except Exception as e:
        print(f"Error type: {type(e)}")
        print(f"Error message: {str(e)}")

asyncio.run(test())
