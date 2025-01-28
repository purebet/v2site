"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { RiSidebarFoldLine } from "react-icons/ri";
import { FaRegHeart, FaArrowTrendUp } from "react-icons/fa6";
import { HiChevronDown, HiChevronRight } from "react-icons/hi2";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import sportsIcons from "../utils/sportsIcons";
import { MdOutlineSportsScore } from "react-icons/md";
import useSearch from "../hooks/useSearch";
import Cookies from "js-cookie";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();
  const path = usePathname();
  const sidebarRef = useRef(null);

  // New state for favorites and top leagues
  const [favorites, setFavorites] = useState([]);
  const [topLeagues, setTopLeagues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch favorites and top leagues
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetching top leagues here (api/top-leagues needed here to fetch the top leagues. as of now i am assuming that that response i will get will be top leagues )
        const TopleaguesResponse = await fetch(
          "https://devapi.purebet.io/v2/leagues"
        );

        console.log("Response status:", TopleaguesResponse.status);
        console.log("Response ok:", TopleaguesResponse.ok);

        if (!TopleaguesResponse.ok) {
          throw new Error(`HTTP error! status: ${TopleaguesResponse.status}`);
        }

        const TopLeagues = await TopleaguesResponse.json();
        console.log(TopLeagues, "This is");

        // Fetching fav leagues here (api/favourites needed here to fetch the fav leagues. as of now i am assuming that that response i will get will be fav leagues )

        const filteredTopLeagues = TopLeagues.filter(
          (league) =>
            league.isTopLeague === true || league.isSportTopLeague === true
        );
        console.log(filteredTopLeagues, "this is top leagues");

        setTopLeagues(filteredTopLeagues);
        console.log(filteredTopLeagues, "filtered top leagues");
        const favoriteLeagues = Cookies.get("favoriteLeagues")
          ? JSON.parse(Cookies.get("favoriteLeagues"))
          : [];
        setFavorites(favoriteLeagues);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      isOpen
    ) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    if (path.includes("/sports/")) {
      const selected = path.split("/sports/")[1].toLowerCase();
      setSelectedItem(selected);
    } else {
      setSelectedItem(null);
    }
  }, [path]);

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
    toggleSidebar();
    router.push(`/sports/${item}`);
  };

  const renderIcon = (IconComponent, src) => {
    if (src) {
      return <Image width={20} height={20} src={src} alt="sport icon" />;
    } else if (IconComponent) {
      return <IconComponent />;
    } else {
      // Fallback icon or text
      return <MdOutlineSportsScore />; // Example fallback icon
    }
  };

  const formatSportName = (sport) => {
    return (
      sport.charAt(0).toUpperCase() +
      sport
        .slice(1)
        .replace(/([A-Z])/g, " $1")
        .trim()
    );
  };

  const [query, setQuery] = useState("");
  const { results, loading, error } = useSearch(query);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Loading state for favorites and top leagues sections
  const renderLoadingState = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-700 rounded mb-2"></div>
      <div className="h-8 bg-gray-700 rounded mb-2"></div>
      <div className="h-8 bg-gray-700 rounded"></div>
    </div>
  );

  return (
    <div
      ref={sidebarRef}
      className={`w-64 h-screen md:relative border-2 border-[#222222] md:ml-4 bg-[#000000] rounded-lg font-inter text-white flex flex-col md:translate-x-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full hidden md:flex"
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Search Section */}
      <div
        className={`p-4 ${
          results.leagues.length > 0 || results.events.length > 0 ? "pb-0" : ""
        } flex items-center relative`}
      >
        <input
          value={query}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search"
          className={`w-full p-2 pl-8 bg-[#171717] text-white ${
            results.leagues.length > 0 || results.events.length > 0
              ? "rounded-t-lg"
              : "rounded-lg"
          }`}
        />
        {!(results.leagues.length > 0 || results.events.length > 0) && (
          <IoIosSearch
            className="absolute right-16 -top-20 text-gray-500"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          />
        )}
        {!(results.leagues.length > 0 || results.events.length > 0) && (
          <RiSidebarFoldLine
            onClick={toggleSidebar}
            className="text-[#818181] ml-2"
            size={30}
          />
        )}
      </div>

      {/* Search Results */}
      {(results.leagues.length > 0 || results.events.length > 0) && (
        <div className="p-[0.9rem] pt-0 ">
          {loading && (
            <p className="text-sm p-6 flex text-[#989898] font-normal items-center mb-4">
              Loading...
            </p>
          )}
          <div className="bg-gradient-to-b from-[#121418] to-[#0C0D10] border border-gray-400 text-white flex items-center p-4 pt-3 rounded-b-md cursor-pointer flex-col justify-between align-middle">
            {error && <p>Error: {error}</p>}
            {results.leagues.length > 0 && (
              <div>
                <div className="text-sm flex text-gray-300 font-normal items-center ">
                  <FaArrowTrendUp size={12} />
                  &nbsp; Top Leagues
                </div>
                <ul>
                  {results.leagues.map((league) => (
                    <li
                      key={league.leagueId}
                      className={`flex  items-center p-2 rounded-md cursor-pointer`}
                    >
                      {league.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {results.events.length > 0 && (
              <div>
                <div className="text-sm flex text-gray-300 font-normal items-center ">
                  <MdOutlineSportsScore size={12} />
                  &nbsp;Top Event
                </div>
                <ul>
                  {results.events.map((event) => (
                    <li
                      key={event.eventId}
                      className={`flex ${
                        results.events.length <= 2 ? "text-sm" : "text-xs"
                      } items-center p-2  rounded-md cursor-pointer`}
                    >
                      {event.eventName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-scroll no-scrollbar">
        {/* Favorites Section */}
        <div className="p-4">
          <h2 className="text-sm flex text-[#989898] font-normal items-center mb-4">
            <FaRegHeart size={12} />
            &nbsp; Favourites
          </h2>
          {isLoading ? (
            renderLoadingState()
          ) : favorites.length > 0 ? (
            <ul>
              {favorites.map((favorite) => (
                <li
                  key={favorite.leagueId}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    selectedItem === favorite.leagueName.toLowerCase()
                      ? "bg-custom-blue text-[#3FAEFF]"
                      : ""
                  }`}
                  onClick={() => handleItemClick(favorite.leagueName)}
                >
                  {renderIcon(
                    sportsIcons[favorite.leagueName.toLowerCase()]?.icon,
                    sportsIcons[favorite.leagueName.toLowerCase()]?.src
                  )}
                  &nbsp; {formatSportName(favorite.leagueName)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#989898]">No favorites added yet.</p>
          )}
        </div>

        {/* Top Leagues Section */}
        <div className="p-4">
          <h2 className="text-sm flex text-[#989898] font-normal items-center mb-4">
            <FaArrowTrendUp size={12} />
            &nbsp; Top Leagues
          </h2>
          {isLoading ? (
            renderLoadingState()
          ) : (
            <ul>
              {topLeagues.map((league) => (
                <li
                  key={league.id}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    selectedItem === league.name.toLowerCase()
                      ? "bg-custom-blue text-[#3FAEFF]"
                      : ""
                  }`}
                  onClick={() => handleItemClick(league.name)}
                >
                  {renderIcon(
                    sportsIcons[league.abbr.toLowerCase()]?.icon,
                    sportsIcons[league.abbr.toLowerCase()]?.src
                  )}

                  {league.abbr}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* All Sports Section */}
        <div className="p-4">
          <h2 className="text-sm flex text-[#989898] font-normal items-center mb-4">
            <MdOutlineSportsScore size={12} />
            &nbsp; All Sports
          </h2>
          <ul>
            {Object.keys(sportsIcons).map((item) => (
              <li
                key={item}
                className={`flex items-center mb-2 p-2 rounded-md cursor-pointer ${
                  selectedItem === item ? "bg-custom-blue text-[#3FAEFF]" : ""
                }`}
                onClick={() => handleItemClick(formatSportName(item))}
              >
                {renderIcon(sportsIcons[item]?.icon, sportsIcons[item]?.src)}
                &nbsp; {formatSportName(item)}
                <div className="ml-auto">
                  {selectedItem === item ? (
                    <HiChevronDown color={"#AAAAAA"} />
                  ) : (
                    <HiChevronRight color={"#AAAAAA"} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
