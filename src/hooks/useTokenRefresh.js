import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getToken,
  isTokenNeedToRefresh,
  decodeAccessToken
} from '../utils/helper'
import { logoutUser, refreshAccessTokenUser } from '../store/slices/authSlice'

export const useTokenRefresh = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const accessToken = token || getToken()
  const isRefreshing = useRef(false)

  useEffect(() => {
    if (!accessToken) return

    const checkAndRefreshToken = async () => {
      const decodedToken = decodeAccessToken(accessToken)

      if (isTokenNeedToRefresh(decodedToken) && !isRefreshing.current) {
        isRefreshing.current = true

        try {
          await dispatch(refreshAccessTokenUser()).unwrap()
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.warn('Refresh token expired. Logging out...')
            await dispatch(logoutUser()).unwrap()
          } else {
            console.error('Error refreshing token:', error)
          }
        } finally {
          isRefreshing.current = false
        }
      }
    }

    checkAndRefreshToken()

    const intervalId = setInterval(checkAndRefreshToken, 30000) // Check every 30 seconds

    return () => clearInterval(intervalId)
  }, [accessToken, dispatch])
}