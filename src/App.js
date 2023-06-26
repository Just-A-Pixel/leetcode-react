import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
    const [number, setNumber] = useState("");
    const [cursor, setCursor] = useState(null);
    const ref = useRef(null);

    const updatePhoneNumber = (e) => {
        setCursor(e.target.selectionStart);
        console.log("clcik at" + e.target.selectionStart)
        const phoneNumber = extractNumber(e.target.value);
        const formattedNumber = formatNumber(phoneNumber, e);
        setNumber(formattedNumber);
    };

    const extractNumber = (value) => {
        console.log("Extracting number...");
        const result = value.replace(/[^0-9]/gi, "");
        return result;
    };

    const formatNumber = (value, e) => {
        var result = value;
        var length = value.length;
        if (length >= 4) {
            result = "(" + value.slice(0, 3) + ") " + value.slice(3, length);
            
            if (
                length === 4 &&
                e.nativeEvent.inputType !== "deleteContentBackward" &&
                cursor === 4
            ) {
                setCursor(7);
            } else if (
              e.nativeEvent.inputType !== "deleteContentBackward" &&
              cursor === 1
            ) {
              setCursor(2)
            }
        } else if (length === 3 &&
          e.nativeEvent.inputType === "deleteContentBackward" && cursor <= 7 && e.target.selectionStart === 3) {
            setCursor(2);
        }

        length = result.length;
        if (length >= 10) {
            result = result.slice(0, 9) + "-" + result.slice(9, length);
            if (
                length === 10 &&
                e.nativeEvent.inputType !== "deleteContentBackward" &&
                cursor === 9
            ) {
                setCursor(11);
                console.log(e.nativeEvent);
            }
        }

        if (length >= 4 && cursor === 0 && e.nativeEvent.inputType === "insertText") setCursor(2)
        return result;
    };

    useEffect(() => {
        const input = ref.current;
        console.log("Cursor "+ cursor)
        if (input) input.setSelectionRange(cursor, cursor);
    }, [ref, cursor, number]);

    return (
        <div class="container text-center">
            <input
                type="tel"
                id="phone"
                maxlength="16"
                placeholder="mobile number"
                autocomplete="off"
                onChange={(e) => updatePhoneNumber(e)}
                value={number}
                ref={ref}
            />
            <div>
                <label for="phone">(123) 456-7890</label>
            </div>
        </div>
    );
}

export default App;

