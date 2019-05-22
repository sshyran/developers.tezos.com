import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import SmoothCollapse from "react-smooth-collapse"
import Bullet from "../assets/bullet.svg"
import Caret from "../assets/caret.svg"
import { palette } from "../utils/variables"

// provides a togglable state
const useHashChangeToggle = ({ isOpen, id }) => {
  const [isItemOpened, setIsItemOpen] = useState(isOpen)
  const hashId = `#${id.toLowerCase()}`

  // update hash if we are opening the toggle, remove if not
  const handleToggle = () => {
    const newHash = !isItemOpened ? hashId : '#'
    window.history.replaceState(null, null, newHash)

    // update state
    setIsItemOpen(!isItemOpened)
  }

  // init item as open if the hash matches on first render
  useEffect(() => {
    if (window.location.hash.toLowerCase() === hashId) {
      setIsItemOpen(true)
    }
  }, [])

  return [
    isItemOpened,
    handleToggle
  ]
}

/**
 *
 * @param {category} String The text shown on the element at all times
 * @param {isOpen} Boolean Default state when the item is loaded in
 * @param {children} any Collapsible items shown/hidden
 * @param {content} Array[Object{
 *  title: String
 *  author: String
 *  description: String
 * }] - Array of Content to show for each category
 *
 */
const CollapsibleItem = ({ category, isOpen = false, content }) => {
  const [isItemOpened, handleToggle] = useHashChangeToggle({ isOpen, id: category })

  return (
    <Wrapper>
      <StyledBullet onClick={handleToggle}>
        <Bullet />
      </StyledBullet>
      <PrimaryContentWrapper>
        <Title onClick={handleToggle}>{category}</Title>
        <SmoothCollapse expanded={isItemOpened}>
          {content.map(item => (
            <ContentLinkWrapper href={item.link} key={item.title}>
              <Content isContentEmpty={item.description.length === 0}>
                <h3>{item.title}</h3>
                <span>{item.author}</span>
                {item.description.length > 0 && (
                  <p>{item.description}</p>
                )}
              </Content>
            </ContentLinkWrapper>
          ))}
        </SmoothCollapse>
      </PrimaryContentWrapper>
      <StyledCaret
        isItemOpen={isItemOpened}
        onClick={handleToggle}
      >
        <Caret />
      </StyledCaret>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`

const StyledBullet = styled.div`
  width: 80px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const PrimaryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 90%;
  margin-left: 39px;
  > * {
    width: 100%;
  }
`

const Title = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 70px;
  font-weight: 300;
  font-size: 36px;
  letter-spacing: 1.5;
  margin-bottom: 0;
  &:hover {
    cursor: pointer;
  }
`

const ContentLinkWrapper = styled.a`
  display: block;
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 32px 0;
  background-color: ${palette.lighterGrey};
  padding: 34px;
  width: 100%;
  h3 {
    margin-bottom: 6px;
    color: ${palette.darkBlue};
    font-size: 28px;
    font-weight: 300;
    line-height: 34px;
    letter-spacing: 1.17px;
  }
  span {
    padding-bottom: 14px;
    margin-bottom: 16px;
    width: 80%;
    border-bottom: ${props => props.isContentEmpty ? 'none' : `1px solid ${palette.grey}`};
    font-weight: 300;
    letter-spacing: 0.67px;
    line-height: 34px;
    font-size: 16px;
    color: ${palette.darkBlue};
  }
  p {
    line-height: 30px;
    font-size: 16px;
    font-weight: 300;
    color: ${palette.darkBlue};
  }
`

const StyledCaret = styled.div`
  width: 80px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    transform: ${props => (props.isItemOpen ? "rotate(180deg)" : "rotate(0)")};
  }
  &:hover {
    cursor: pointer;
  }
`

export default CollapsibleItem