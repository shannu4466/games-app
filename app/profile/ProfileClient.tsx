"use client"

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import styled from "styled-components";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReactFileReader from "react-file-reader";

type FileData = {
    base64: string
}

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    object-fit: cover;
    border-radius: 50%;
  }
  .circle {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    right: 23em !important;
    position: absolute;
    width: 48px;
    height: 48px;
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
`;

export default function ProfileClient() {
    const [url, setUrl] = useState("https://i.imgur.com/ndu6pfe.png");

    const { user } = useAuth()

    const handleFiles = (files: FileData) => {
        setUrl(files.base64);
    };

    const name = user?.email ? user?.email.split('@')[0].charAt(0).toUpperCase() + user?.email.split('@')[0].slice(1) : ""
    const userName = name.replace(/\d/g, "")

    return (
        <Box>
            <Navbar />
            <Box sx={{ m: 2 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "30px", mb: 3 }}>Profile</Typography>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ mr: 10 }}>
                        <AvatarInput>
                            <Image src={url} alt="avatar" width="300" height="300" loading="eager" />
                        </AvatarInput>
                        <ReactFileReader
                            fileTypes={[".png", ".jpg"]}
                            base64={true}
                            handleFiles={handleFiles}
                        >
                            <Button variant="contained" color="secondary" sx={{ display: "flex", alignItems: "center" }}>
                                <CloudUploadIcon type="button" sx={{ mr: 1 }} />
                                Upload image
                            </Button>
                        </ReactFileReader>
                    </Box>
                    <Box sx={{ p: 3, }}>
                        <Typography color="text.secondary">
                            Welcome back to your profile
                        </Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: "30px" }}>
                            {userName}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}