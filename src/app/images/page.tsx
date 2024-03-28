"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import db from "../database/db";
import { GoMoveToTop } from "react-icons/go";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";


export const images = () => {
	const [images, setImages] = useState<any[]>([])
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const currentPage = useRef<number>(0);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const getImages = async () => {
    try {
      const  res  = await fetch(`/api/images?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const newImages = await res.json()
      setImages((prevImages: any) => [...prevImages, ...newImages]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
	useEffect(() => {
    if (page !== currentPage.current) {
      setLoading(true);
      currentPage.current = page;
      getImages();
    }
	}, [page])

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight && !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const getLikedImages = async (user: string) => {
    const likedImages: string[] = await db.get(user).catch(() => []);
    return likedImages;
  }

  const initLikes = async (user: string) => {
    const likedImages = await getLikedImages(user);
    setLikedImages(likedImages);
  }

  const likeImage = async (user: string, imageId: string) => {
    const likedImages = await getLikedImages(user);
    likedImages.push(imageId);
    await db.put(user, likedImages);
  }

  const unlikeImage = async (user: string, imageId: string) => {
    const likedImages = await getLikedImages(user);
    const newLikedImages = likedImages.filter((id) => id !== imageId);
    await db.put(user, newLikedImages);
  }

  useEffect(() => {
    const username = localStorage.getItem('username')
    if (username) {
      setUsername(username)
      getLikedImages(username);
      initLikes(username);
    } else {
      router.push("/");
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleLike = async (imageId: string) => {   
    if (likedImages.includes(imageId)) {
      // If image is already liked, unlike it
      await unlikeImage(username, imageId);
      setLikedImages(likedImages.filter((id) => id !== imageId));
    } else {
      // If image is not liked, like it
      await likeImage(username, imageId);
      setLikedImages([...likedImages, imageId]);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

	return (
		<div>
			<Header />
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
				{images.map((image: any) => (
          <li key={image.id} className="rounded-lg overflow-hidden shadow-lg">
            <img src={image.urls.regular} alt={image.alt_description} className="w-full h-64 object-cover" />
            <div className="px-6 py-4">
              <div className="flex justify-between">
                <div className="flex gap-2  items-center">
                  <img src={image.user.profile_image.small} className="rounded-full w-8 h-8"/>
                  <p className="text-gray-500 text-sm">
                    {image.user.name}
                  </p>
                </div>
                <button className="text-2xl" onClick={() => toggleLike(image.id)}>
                  {likedImages.includes(image.id) ? (
                    <AiFillHeart className="text-red-500" /> // Liked icon
                  ) : (
                    <AiOutlineHeart /> // Not liked icon
                  )}

                </button>
              </div>
            </div>
          </li>
        ))}
			</ul>
      {loading && <Spinner/>}
      <button
        onClick={scrollToTop}
        className="fixed text-xl bottom-4 right-4 bg-zinc-700 hover:bg-zinc-900 text-white  py-2 px-2 rounded-full hover:scale-110 transition-transform duration-300 ease-in-out"
      >
        <GoMoveToTop />
      </button>

		</div>   
	)
}

export default images