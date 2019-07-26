# Tencentcloud SMS examples

## Installing

Using npm:
```
npm install
```
Using yarn:
```
yarn
```

## develop

```
yarn dev
```

## build
```
yarn start
```

## Example

### Send single message POST request


```
localhost:3000/send/single
```

example request body

```json
{
	"mobile": "957529XXX"
}
```

## Send bulk message POST request

```
localhost:3000/send/bulk
```

example request body

```json
{
	"mobile": ["957529XXX", "957529XXX"]
}
```

## Current message template

> verification code is {1} (valid for {2} minutes). For account safety, don't forward the code to others.

```{1} {2} are parameters```
