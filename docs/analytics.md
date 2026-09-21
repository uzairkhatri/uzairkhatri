# Analytics and testing

GA4 property tag: `G-1LXS5Z6GJ6`.

## Collection boundary

- The tag only loads on HTTPS `uzairkhatri.com` and `www.uzairkhatri.com`.
- Localhost, IP addresses, GitHub Pages and preview domains never initialize the tag or queue custom events, including when serving a production build.
- Before testing the live site, open `https://uzairkhatri.com/?analytics=off`. This saves an opt-out in that browser's local storage before loading Google Analytics. Future pages and reloads on that origin remain excluded.
- To resume measurement, open `https://uzairkhatri.com/?analytics=on` as a full page load. This is a testing preference, not a cookie-consent interface.
- Use the opt-out separately for each browser/profile and hostname. Reload any already-open site tabs after changing it. If storage is blocked, analytics stays disabled. Clearing site storage removes the saved preference.
- The implementation also respects Google's `ga-disable-G-1LXS5Z6GJ6` flag.

## Event definitions

| Event | Meaning | Parameters |
| --- | --- | --- |
| `generate_lead` | Contact API confirmed success; not a failed attempt or email draft | Existing `lead_type`, `method`, category/label/value |
| `booking_click` | One activation of a link to the configured Calendly booking URL, on any page | `source`, `page_path`, existing category/label/value |
| `case_study_click` | An internal link to an individual `/work/<slug>` page | `case_study`, `source`, `page_path`, `destination_path` |

Booking clicks are not completed bookings. A subsequent click on the modal's direct Calendly fallback is a separate click with source `booking_modal_direct`. The advisory contact anchor is not a booking click. GA enhanced measurement may separately record its own outbound `click` event; do not add that to `booking_click` as though they were distinct booking intents.

One delegated capture listener tracks each left/keyboard/modified click or middle-click. The booking modal and individual components no longer emit the same event again. Explicit `data-source` values are retained; otherwise the nearest section ID or `page_link` is used. No form text, email addresses, link text, or URL query/hash values are added to these custom click events.

## Reports and limits

This code does not change GA4 account settings, register custom dimensions, or mark key events. To analyze custom parameters in standard reports, register event-scoped dimensions for `source`, `case_study`, and `destination_path` in GA4 as needed. Treat confirmed `generate_lead` as the lead conversion, not booking intent.

For historical review, compare reports using Host name equal to the production hostname(s) to exclude recorded localhost/preview traffic. This does not identify testing that happened on the live hostname, guarantee that remaining traffic is human, or repair past duplicate/missing events. New GA4 data filters are not retroactive; do not delete historical data to guess which visits were tests.

## Validation

Run `npm run test:analytics` and `npm run build`. Tests use the actual client modules in an isolated browser simulation with no network access. Browser smoke tests should run on localhost; live visual checks must use the saved opt-out first. Do not submit test leads or bookings to live services without explicit approval.
