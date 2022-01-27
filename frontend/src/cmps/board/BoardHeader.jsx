import React, { useState, useEffect } from 'react';
import { IoPersonAddOutline, IoStarOutline, IoEllipsisHorizontalSharp, IoBarChart } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

// Action
import { toggleModal, toggleSideMenu } from '../../store/app/app.action';

export function BoardHeader({ board }) {
  const { title, members } = board;
  const dispatch = useDispatch();

  const onToggleMenu = () => {
    dispatch(toggleSideMenu());
  };

  const onAddMemberToBoard = event => {
    dispatch(toggleModal({ event, type: 'addMemberToBoard' }));
  };

  const getAvatarBackground = member => {
    return { background: `url(${member.imgUrl}) center center / cover` };
  };

  const onMemberClick = (event, member) => { 
    dispatch(toggleModal({ event, type: 'otherMemberModal', member }));
  }

  return (
    <header className="board-header ">
      <nav className="main-nav flex align-center justify-space-between">
        <div className="nav-left flex">
          <h1 className="header-title flex align-center justify-center">{title}</h1>
          <div className="nav-left-actions flex">
            <div className="nav-btn fav">
              <button>
                <IoStarOutline />
              </button>
            </div>
            <div className="nav-members">
              {members.map((member, index) => (
                <div style={getAvatarBackground(member)} className={`member-avatar`} key={index} onClick={(event) => { 
                  onMemberClick(event, member)
                }}></div>
              ))}
            </div>
            <div
              className="nav-btn add-member"
              onClick={event => {
                onAddMemberToBoard(event);
              }}>
              <button>
                <IoPersonAddOutline />
              </button>
            </div>
          </div>
        </div>
        <div className="nav-right flex">
          <button className="nav-btn flex">
            <IoBarChart /> Dashbaord
          </button>
          <button
            className="nav-btn flex"
            onClick={() => {
              onToggleMenu();
            }}>
            <IoEllipsisHorizontalSharp /> Show Menu
          </button>
        </div>
      </nav>
    </header>
  );
}
