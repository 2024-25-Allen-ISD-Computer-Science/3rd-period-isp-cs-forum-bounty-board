package main

import (
    "log"
    "net/http"

    "github.com/pocketbase/pocketbase"
    "github.com/pocketbase/pocketbase/core"
    "github.com/labstack/echo/v5"
)

func main() {
    // Create new PocketBase instance
    app := pocketbase.New()

    // Add the CORS middleware
    app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
        // Use the correct middleware function for Echo v5
        e.Router.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
            return func(c echo.Context) error {
                // Allow any origin for testing (replace "*" with specific origins if needed)
                origin := c.Request().Header.Get("Origin")
                log.Println("Request Origin:", origin) // Log the origin

                // Set CORS headers
                c.Response().Header().Set("Access-Control-Allow-Origin", "*")
                c.Response().Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                c.Response().Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

                // Handle OPTIONS (preflight request)
                if c.Request().Method == http.MethodOptions {
                    return c.NoContent(http.StatusNoContent)
                }

                // Call the next handler in the chain
                return next(c)
            }
        })
        return nil
    })

    // Start PocketBase
    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}
