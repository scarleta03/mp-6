"use client"

import { useEffect } from "react"
import Image from "next/image"
import styled from "styled-components"
import { clearSession, handleSignOut } from "../actions"

type User = {
    name?: string | null
    email?: string | null
    image?: string | null
    username?: string
}

export default function ProfileCard({ user }: { user: User }) {
    // delete the session cookie on mount so refreshing sends them back to sign in
    // the user data still shows because it was passed as props from the server
    useEffect(() => {
        clearSession()
    }, [])

    return (
        <Wrapper>
            {user.image && (
                <Avatar
                    src={user.image}
                    alt="profile picture"
                    width={90}
                    height={90}
                />
            )}
            <Info>
                {user.name && <Name>{user.name}</Name>}
                {user.username && <Username>@{user.username}</Username>}
                {user.email && <Email>{user.email}</Email>}
            </Info>
            <form action={handleSignOut}>
                <SignOutButton type="submit">sign out</SignOutButton>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`

// circle crop with a pink ring
const Avatar = styled(Image)`
    border-radius: 50%;
    border: 3px solid #f9a8d4;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`

const Name = styled.p`
    font-size: 40px;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
`

const Username = styled.p`
    font-size: 28px;
    color: #c084fc;
    margin: 0;
`

const Email = styled.p`
    font-size: 22px;
    color: #9ca3af;
    margin: 0;
`

const SignOutButton = styled.button`
    margin-top: 8px;
    padding: 14px 36px;
    border-radius: 999px;
    border: 1.5px solid #e5e7eb;
    background: transparent;
    font-size: 22px;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        background: #eff6ff;
        border-color: #93c5fd;
        color: #1d4ed8;
    }
`
