class ArticleController < ApplicationController
  def new
    @Article = Article.new
    @Article.save
    redirect_to edit_article_path(@Article)

    # "/article/#{@Article.id}/edit"
  end

  def edit
    # byebug

  end

  def upload_image
    a = Article.find(params[:id])
    a.image =  params[:file]
    a.save
    url = a.image.url
     render json: url
  end
end
