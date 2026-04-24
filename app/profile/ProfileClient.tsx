"use client"

import { Box, Typography, Button } from "@mui/material"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

import styled from "styled-components"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import ReactFileReader from "react-file-reader"

type FileData = {
  base64: string
}

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    width: clamp(140px, 32vw, 186px);
    height: clamp(140px, 32vw, 186px);
    object-fit: cover;
    border-radius: 50%;
  }

  .circle {
    width: clamp(140px, 32vw, 186px);
    height: clamp(140px, 32vw, 186px);
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: clamp(38px, 10vw, 48px);
    height: clamp(38px, 10vw, 48px);
    background: #312e38;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #f4ede8;
    }

    &:hover {
      background: blue;
    }
  }
`

export default function ProfileClient() {
  const [url, setUrl] = useState<string>(() => {
    const getProfilePicture = localStorage.getItem("userProfilePicture")

    if (getProfilePicture) {
      return getProfilePicture
    }

    return "https://i.imgur.com/ndu6pfe.png"
  })

  const { user } = useAuth()

  const handleFiles = (files: FileData) => {
    setUrl(files.base64)
    localStorage.setItem("userProfilePicture", files.base64)
  }

  const name = user?.email
    ? user?.email.split("@")[0].charAt(0).toUpperCase() +
      user?.email.split("@")[0].slice(1)
    : ""

  const userName = name.replace(/\d/g, "")

  return (
    <Box>
      <Navbar />

      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 }
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "24px", sm: "28px", md: "30px" },
            mb: { xs: 3, sm: 4 }
          }}
        >
          Profile
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            gap: { xs: 4, md: 6 }
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "auto" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <AvatarInput>
              <Image
                src={url}
                alt="avatar"
                width={300}
                height={300}
                loading="eager"
                style={{
                  width: "clamp(140px, 32vw, 186px)",
                  height: "clamp(140px, 32vw, 186px)"
                }}
              />
            </AvatarInput>

            <ReactFileReader
              fileTypes={[".png", ".jpg", ".jpeg"]}
              base64={true}
              handleFiles={handleFiles}
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: { xs: 2, sm: 3 },
                  py: 1,
                  fontSize: { xs: "0.8rem", sm: "0.95rem" },
                  width: { xs: "100%", sm: "auto" },
                  maxWidth: 240
                }}
              >
                <CloudUploadIcon sx={{ mr: 1 }} />
                Upload image
              </Button>
            </ReactFileReader>
          </Box>

          <Box
            sx={{
              p: { xs: 0, sm: 1, md: 3 },
              textAlign: { xs: "center", md: "left" },
              width: "100%"
            }}
          >
            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.95rem", sm: "1rem" }
              }}
            >
              Welcome back to your profile
            </Typography>

            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "28px", sm: "34px", md: "40px" },
                wordBreak: "break-word"
              }}
            >
              {userName}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}