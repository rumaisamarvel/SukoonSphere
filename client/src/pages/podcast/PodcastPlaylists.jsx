import { HeaderImg } from "@/components";
import Playlist from "../../assets/images/playlist.jpg";
import React from "react";
import { podcastsLists } from "@/utils/podcastsLists";
import { Link, useParams } from "react-router-dom";

import bg_podcast from "../../assets/images/bg-podcast.jpg";
function PodcastPlaylists() {
  return (
    <>
      {/* <HeaderImg
        bgImg={Playlist}
        currentPage="Podcast Playlist"
        className="h-[40vh] object-contain"
      /> */}
      <div className="container mt-10 flex flex-col gap-8  ">
        <h1 className="text-5xl mb-4 font-semibold">Podcast PlayLists</h1>
        <p className="text-xl text-black">
          Where we see sound explorations, podcasts, stories, radio essays,
          which help build a grassroots to policy level conversation around
          gender and patriarchy
        </p>
        {podcastsLists.map((podcastsList) => (
          <div className="flex  rounded-[25px] shadow-lg mt-4 w-[70%] border-b-[1px] border-[var(--secondary)] p-6 gap-4 "
            style={{objectFit:'contain', backgroundImage:`linear-gradient(rgb(69 70 71 / 35%), rgb(118 118 118 / 35%)) ,url(https://img.freepik.com/free-vector/gold-music-notes-background_78370-7396.jpg?t=st=1729089331~exp=1729092931~hmac=895a4b15084cc46a301342db300bdeccdd974c67a93b1807136e4242e0f19b0f&w=740)`}}
          >
            <img
              className="w-52 rounded-[20px]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgWY7eeoKIGlhc8-3qCnhIJISb5ZNxY9qEOA&s"
              alt=""
            />
            <div className="flex flex-col gap-1 text-black  ">
              <Link to={`/podcast/${podcastsList.podcastListId}`}>
                {" "}
                <h3 className="text-4xl text-[var(--primary)] font-bold mb-2">
                  {podcastsList.podcastTitle}
                </h3>
              </Link>
              <div className="flex gap-3 items-center">
                <img
                  className="w-7 h-7 rounded-full"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt=""
                />
                <span>Dr. Emily Stone</span>
              </div>
              <span>Episodes : 10</span>
              <p className="text-black">{podcastsList.podcastDiscription}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PodcastPlaylists;
