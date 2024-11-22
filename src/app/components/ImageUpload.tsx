'use client'

import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Grid,
    Card,
    CardMedia,
    CircularProgress,
} from "@mui/material";

interface uploadedImageType {
    url: string,
    isLoading: boolean
}

const ImageUpload: React.FC = () => {
    const [images, setImages] = useState<uploadedImageType[]>([]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages: uploadedImageType[] = Array.from(files).map((file) => ({
                url: URL.createObjectURL(file),
                isLoading: true
            }))

            setImages((prevImages) => [...prevImages, ...newImages]);
            setTimeout(() => {
                setImages((prevImages) =>
                    prevImages.map((img) =>
                        newImages.some((newImg) => newImg.url === img.url)
                            ? { ...img, isLoading: false }
                            : img
                    )
                );
            }, 3000);

        }
    };

    const handleDeleteImage = (url: string) => {

    }

    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: "0 auto", height: "100%" }}>
            <Typography variant="h4" gutterBottom>
                Multi Image Upload
            </Typography>
            <Button
                variant="contained"
                component="label"
                sx={{ mb: 2 }}
            >
                Upload Images
                <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </Button>
            <Grid container spacing={2}>
                {images.map((image, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                        <Card>
                            {image.isLoading ? (
                                <Box
                                    sx={{
                                        height: 140,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ): (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={image.url}
                                    alt={`Uploaded preview ${index + 1}`}
                                />
                            )}
                                </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ImageUpload;
