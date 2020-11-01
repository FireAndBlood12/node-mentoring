import { Request, Response } from 'express';
import AppError from '../../utils/AppError';
import Group from '../../models/GroupModel';
import { groupRouter, groupService, userService } from '../../routers/groups';
import { logger } from '../../utils/logger';

describe('Groups unit tests', () => {
    jest.spyOn(logger, 'info').mockImplementation();
    describe('[GET] get all groups', () => {
        test('should return all groups', async () => {
            const allGroups = [
                new Group({ id: '1', name: 'KF1', permissions:['READ', 'WRITE', 'DELETE'] }),
                new Group({ id: '2', name: 'KF2', permissions:['READ', 'DELETE'] }),
                new Group({ id: '3', name: 'KF2', permissions:['READ', 'WRITE'] })
            ];
            const spy = jest.spyOn(groupService, 'getAll').mockResolvedValueOnce(allGroups);
            const mRes : Partial<Response> = {};
            const mockStatus = jest.fn().mockReturnValue(mRes);
            mRes.status = mockStatus;
            const mockJson = jest.fn().mockReturnValue(mRes);
            mRes.json = mockJson;
            const mNext = jest.fn();
            await groupRouter({ method: 'GET', url: '/' } as Request, mRes as Response, mNext);
            expect(spy).toHaveBeenCalled();
            setTimeout(() => expect(mRes.json).toHaveBeenCalledWith(allGroups), 0);
        });
    });

    describe('[POST] create new group', () => {
        test('should return erorr if name is not correct(length < 3)', async () => {
            const req : Partial<Request> = {
                method: 'POST',
                url: '/',
                body : {
                    name: 'e3',
                    permissions:['READ', 'WRITE', 'DELETE']
                }
            };
            const err = {
                'status': 'failed',
                'errors': [
                    {
                        'path': [
                            'name'
                        ],
                        'message': '"name" length must be at least 3 characters long'
                    }
                ]
            };
            const mRes : Partial<Response> = {};
            const mockStatus = jest.fn().mockReturnValue(mRes);
            mRes.status = mockStatus;
            const mockJson = jest.fn().mockReturnValue(mRes);
            mRes.json = mockJson;
            const mNext = jest.fn();
            await groupRouter(req as Request, mRes as Response, mNext);
            setTimeout(() => expect(mRes.status).toHaveBeenCalledWith(400), 0);
            setTimeout(() => expect(mRes.json).toHaveBeenCalledWith(err), 0);
        });

        test('should return erorr if name is not correct(contain not alpha-numeric characters)', async () => {
            const req : Partial<Request> = {
                method: 'POST',
                url: '/',
                body : {
                    name: 'ugdfu@ihvfi',
                    permissions:['READ', 'WRITE', 'DELETE']
                }
            };
            const err = {
                'status': 'failed',
                'errors': [
                    {
                        'path': [
                            'name'
                        ],
                        'message': '"name" must only contain alpha-numeric characters'
                    }
                ]
            };
            const mRes : Partial<Response> = {};
            const mockStatus = jest.fn().mockReturnValue(mRes);
            mRes.status = mockStatus;
            const mockJson = jest.fn().mockReturnValue(mRes);
            mRes.json = mockJson;
            const mNext = jest.fn();
            await groupRouter(req as Request, mRes as Response, mNext);
            setTimeout(() => expect(mRes.status).toHaveBeenCalledWith(400), 0);
            setTimeout(() => expect(mRes.json).toHaveBeenCalledWith(err), 0);
        });

        test('should return erorr if permission is not correct', async () => {
            const req : Partial<Request> = {
                method: 'POST',
                url: '/',
                body : {
                    name: 'test123',
                    permissions: ['createUpdate', 'WRITE', 'DELETE']
                }
            };
            const err = {
                'status': 'failed',
                'errors': [
                    {
                        'path': [
                            'permissions',
                            1
                        ],
                        'message': '"permissions[1]" must be one of [READ, WRITE, DELETE, SHARE, UPLOAD_FILES]'
                    }
                ]
            };
            const mRes : Partial<Response> = {};
            const mockStatus = jest.fn().mockReturnValue(mRes);
            mRes.status = mockStatus;
            const mockJson = jest.fn().mockReturnValue(mRes);
            mRes.json = mockJson;
            const mNext = jest.fn();
            await groupRouter(req as Request, mRes as Response, mNext);
            setTimeout(() => expect(mRes.status).toHaveBeenCalledWith(400), 0);
            setTimeout(() => expect(mRes.json).toHaveBeenCalledWith(err), 0);
        });

        test('should return erorr if name already used', async () => {
            const req : Partial<Request> = {
                method: 'POST',
                url: '/',
                body : {
                    name: 'root',
                    permissions:['READ', 'WRITE', 'DELETE']
                }
            };
            const spy = jest.spyOn(groupService, 'checkExistingName').mockResolvedValueOnce(true);
            const mRes : Partial<Response> = {};
            const mockStatus = jest.fn().mockReturnValue(mRes);
            mRes.status = mockStatus;
            const mockJson = jest.fn().mockReturnValue(mRes);
            mRes.json = mockJson;
            const mNext = jest.fn();
            await groupRouter(req as Request, mRes as Response, mNext);
            expect(spy).toHaveBeenCalledWith(req.body.name);
            setTimeout(() => expect(mRes.status).toHaveBeenCalledWith(400), 0);
            setTimeout(() => expect(mNext).toHaveBeenCalledWith(
                new AppError(`Group with such name: '${req.body.name}' already exists!`, 400)
            ), 0);
        });

        test('should return new group if all fields are correct', async () => {
            const req : Partial<Request> = {
                method: 'POST',
                url: '/',
                body : {
                    name: 'rootTest',
                    permissions:['READ', 'WRITE', 'DELETE']
                }
            };
            const newGroup = new Group({
                id: 123,
                name: 'rootTest',
                permissions:['READ', 'WRITE', 'DELETE']
            });
            const existingSpy = jest.spyOn(groupService, 'checkExistingName').mockResolvedValueOnce(false);
            const createSpy = jest.spyOn(groupService, 'create').mockResolvedValueOnce(newGroup);
            const mRes : Partial<Response> = {};
            const mockStatus = jest.fn().mockReturnValue(mRes);
            mRes.status = mockStatus;
            const mockJson = jest.fn().mockReturnValue(mRes);
            mRes.json = mockJson;
            const mNext = jest.fn();
            await groupRouter(req as Request, mRes as Response, mNext);
            expect(existingSpy).toHaveBeenCalledWith(req.body.name);
            setTimeout(() => expect(createSpy).toHaveBeenCalledWith(req.body), 0);
            setTimeout(() => expect(mRes.status).toHaveBeenCalledWith(200), 0);
            setTimeout(() => expect(mRes.json).toHaveBeenCalledWith(newGroup), 0);
        });
    });
});
