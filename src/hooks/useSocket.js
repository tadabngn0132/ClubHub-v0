import { useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import { socket } from "../utils/socket";