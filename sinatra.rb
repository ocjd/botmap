require 'sinatra'

set :bind, '0.0.0.0'
set :port, 3000

  get '/' do
  	@contents = []
  	@contents.push File.read('../coords.txt')
	erb :map
  end

  get '/coords' do
  	@coords = File.read('../coords.txt')
  	@coords
  end