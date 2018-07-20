import { Controller } from "egg";

// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

declare module 'egg' {
    class Subscription extends Controller {
        static schedule: { interval: string, type: string }
        subscribe();
    }
}
