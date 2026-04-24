import { auth } from "@/auth"
import { handleSignIn } from "./actions"
import ProfileCard from "./components/ProfileCard"
import styled from "styled-components"

// show profile if logged in, otherwise show the sign in button
export default async function Home() {
    const session = await auth()

    return (
        <Page>
            <Card>
                {session?.user ? (
                    <>
                        <Heading>your profile</Heading>
                        <ProfileCard
                            user={{
                                name: session.user.name,
                                email: session.user.email,
                                image: session.user.image,
                                username: session.user.username,
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Heading>hey</Heading>
                        <Sub>sign in to see your stuff</Sub>
                        <form action={handleSignIn}>
                            <SignInButton type="submit">
                                sign in with github
                            </SignInButton>
                        </form>
                    </>
                )}
            </Card>
        </Page>
    )
}


const Page = styled.main`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #dbeafe;
    padding: 20px;
`

const Card = styled.div`
    background: #fff;
    border-radius: 24px;
    padding: 64px 56px;
    width: 90%;
    max-width: 560px;
    text-align: center;
    box-shadow: 0 4px 32px rgba(59, 130, 246, 0.1);
    border: 1px solid #bfdbfe;
`

const Heading = styled.h1`
    font-size: 36px;
    font-weight: 800;
    color: #1e40af;
    margin: 0 0 10px;
`

const Sub = styled.p`
    font-size: 18px;
    color: #60a5fa;
    margin: 0 0 24px;
`

const SignInButton = styled.button`
    padding: 16px 40px;
    border-radius: 999px;
    background: #1e40af;
    color: #fff;
    font-size: 22px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    margin: 0 auto;
    transition: background 0.15s ease;

    &:hover {
        background: #1d4ed8;
    }
`
