import { describe, it, expect, vi, beforeEach } from 'vitest'
import { httpService } from '../http-service'
import Axios from 'axios'
import type { AxiosResponse } from 'axios'

vi.mock('axios', () => ({
    default: {
        create: vi.fn(() => ({
            interceptors: {
                request: { use: vi.fn() },
                response: { use: vi.fn() }
            },
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            patch: vi.fn(),
            delete: vi.fn()
        })),
        AxiosHeaders: vi.fn().mockImplementation(() => ({
            set: vi.fn()
        }))
    }
}))

const mockedAxios = Axios.create()

describe('httpService', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should perform a GET request successfully', async () => {
        const headers = new Axios.AxiosHeaders()
        headers.set('Content-Type', 'application/json')

        const mockResponse: AxiosResponse = {
            data: { message: 'Success' },
            status: 200,
            statusText: 'OK',
            headers,
            config: { headers },
            request: {}
        }

        vi.mocked(mockedAxios.get).mockResolvedValueOnce(mockResponse)

        const data = await httpService.get('/test')
        expect(data).toEqual(mockResponse.data)
        expect(mockedAxios.get).toHaveBeenCalledWith('/test', undefined)
    })

    it('should perform a POST request successfully', async () => {
        const headers = new Axios.AxiosHeaders()
        headers.set('Content-Type', 'application/json')

        const mockResponse: AxiosResponse = {
            data: { message: 'Created' },
            status: 201,
            statusText: 'Created',
            headers,
            config: { headers },
            request: {}
        }

        vi.mocked(mockedAxios.post).mockResolvedValueOnce(mockResponse)

        const data = await httpService.post('/test', { key: 'value' })
        expect(data).toEqual(mockResponse.data)
        expect(mockedAxios.post).toHaveBeenCalledWith('/test', { key: 'value' }, undefined)
    })

    it('should handle 401 error and refresh token', async () => {
        const headers = new Axios.AxiosHeaders()
        headers.set('Content-Type', 'application/json')

        const originalRequest = {
            url: '/protected/resource',
            method: 'get',
            headers,
            _retry: false
        }

        const refreshResponse: AxiosResponse = {
            data: { token: 'New Access Token' },
            status: 200,
            statusText: 'OK',
            headers,
            config: { headers },
            request: {}
        }

        const unauthorizedResponse = {
            response: {
                status: 401,
                config: originalRequest,
                data: { message: 'Unauthorized' }
            }
        }

        vi.mocked(mockedAxios.get).mockRejectedValueOnce(unauthorizedResponse)
        vi.mocked(mockedAxios.post).mockResolvedValueOnce(refreshResponse)

        const getDataPromise = httpService.get('/protected/resource')

        await vi.runAllTimersAsync()

        const data = await getDataPromise

        expect(data).toEqual(unauthorizedResponse.response.data)
        expect(mockedAxios.get).toHaveBeenCalledWith('/protected/resource', undefined)
        expect(mockedAxios.post).toHaveBeenCalledWith('/accounts/refresh', undefined)
    })

    it('should log out the user if refresh fails', async () => {
        const headers = new Axios.AxiosHeaders()
        headers.set('Content-Type', 'application/json')

        const originalRequest = {
            url: '/protected/resource',
            method: 'get',
            headers,
            _retry: false
        }

        const unauthorizedResponse = {
            response: { status: 401, config: originalRequest }
        }

        vi.mocked(mockedAxios.get).mockRejectedValueOnce(unauthorizedResponse)
        vi.mocked(mockedAxios.post).mockRejectedValueOnce(new Error('Token refresh failed'))

        await expect(httpService.get('/protected/resource')).rejects.toThrow('Token refresh failed')
    })
})
