### General Info

- Use `npm i` to get started.
- Work on a separate branch and then PR.
- Remember to always **pull and then push**.

### Docker Build CMD:

- `docker build -t notifier-frontend .`
- `docker run -d -p 5000:5000 --name nf notifier-frontend`
- `docker run -d -p 5000:5000 -v $(pwd):/app --name nf notifier-frontend`
- `docker logs -f nf`
- `docker exec -it nf sh`
